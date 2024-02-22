import { IUserBusiness, IUserBusinessArticles } from "../models/domain";
import {
  AdPropmotionContentEntry,
  UserBusiness,
  UserBusinessArticlesModel,
  UserBusinessProductsModel,
  UserBusinessServiceModel,
} from "../models/schema";
import { JsonAPIData } from "../types";
import { Product } from "../types/interface/business-data";
import { GenerateAdDependencyDataType } from "../types/interface/content-generation-data";
import { convertToObjectId } from "../utils/convert-to-objectid";
import { ScrappedDataGPTResponse } from "./chat-gpt";
import { GCPSearchAPI } from "./web-observer";
import { WebScrapperAPI } from "./web-scrapper-api";

type GenerateAdDependencyData = GenerateAdDependencyDataType;

interface DependencyData {
  services: Product[];
  products: Product[];
  businessInfo: {
    _id?: string;
    businessName: string;
    description: string;
    additionalDetails: string;
  };
}
export class ProcessArticle {
  private userId: string;
  private businessId: string;
  private requestData: GenerateAdDependencyData;

  constructor(
    userId: string,
    businessId: string,
    data: GenerateAdDependencyData
  ) {
    this.userId = userId;
    this.businessId = businessId;
    this.requestData = data;
  }

  getNotExtractedArticles = async () => {
    const businessArticle = (await UserBusinessArticlesModel.findOne({
      businessId: convertToObjectId(this.businessId as string),
      extracted: false,
    })) as IUserBusinessArticles;
    return businessArticle;
  };

  getExtractedArticles = async () => {
    const articleLinks = await UserBusinessArticlesModel.find({
      businessId: convertToObjectId(this.businessId as string),
      extracted: true,
    }).select("link");
    return articleLinks;
  };

  getUserBusinessQueryString = async () => {
    const userBusiness = await UserBusiness.findOne({
      _id: convertToObjectId(this.businessId),
    }).select("queryString");
    return userBusiness.queryString as string;
  };

  getDependencyData = async (
    data: GenerateAdDependencyData
  ): Promise<DependencyData> => {
    let products = [];
    let services = [];
    const businessInfo = (await UserBusiness.findOne({
      _id: convertToObjectId(this.businessId),
    }).select([
      "businessName",
      "description",
      "additionalDetails",
    ])) as IUserBusiness;

    if (data?.products?.length !== 0) {
      products = await UserBusinessProductsModel.find({
        _id: { $in: data.products },
      });
    }

    if (data?.services?.length !== 0) {
      services = await UserBusinessServiceModel.find({
        _id: { $in: data.services },
      });
    }

    return { businessInfo, products, services };
  };

  generateBusinessQueryString = async () => {
    const { businessInfo, products, services } = await this.getDependencyData(
      this.requestData
    );
    const businessInfos = `
    business name and description: <${businessInfo?.businessName}\n. ${businessInfo?.description}. ${businessInfo.additionalDetails}>
    business products: <${products}>\n
    business services: <${services}>
    `;
    const { GCP_API_QueryString } = new ScrappedDataGPTResponse();
    const queryString = await GCP_API_QueryString(businessInfos);
    return queryString;
  };

  getArticlesFromJSONAPI = async (nextPageToken: number = 1) => {
    const queryString = await this.generateBusinessQueryString();
    const data: JsonAPIData = await GCPSearchAPI(queryString, nextPageToken);
    return data;
  };

  //assuming that articles with extrated:false is empty
  stockDBwithArticles = async (nextPageToken: number = 1): Promise<boolean> => {
    const GCPJsonAPIArticles = await this.getArticlesFromJSONAPI(nextPageToken);
    const articleLinks = await this.getExtractedArticles();

    if (articleLinks.length === 0) {
      GCPJsonAPIArticles.items.forEach(
        (item: any) => (item.businessId = this.businessId)
      );
      await UserBusinessArticlesModel.create(GCPJsonAPIArticles.items);
      return true;
    }

    const array: any = [];
    articleLinks.forEach((article) => {
      const hasLink: any = GCPJsonAPIArticles.items.find(
        (item: any) => item.link !== article.link
      );

      if (hasLink) {
        hasLink.businessId = this.businessId;
        array.push(hasLink);
      }
    });

    if (array.length === 0) {
      if (!GCPJsonAPIArticles.queries.nextPage)
        throw new Error("no more articles for this business");
      return false;
    }
    await UserBusinessArticlesModel.create(array);
    return true;
  };

  generateAdPromosionText = async () => {
    const businessArticle = await this.getNotExtractedArticles();
    if (!businessArticle) throw new Error("articles needs to be restocked");
    const { getArticleContent } = new WebScrapperAPI();
    const { generateContentFromSummary } = new ScrappedDataGPTResponse();
    const { businessInfo, products, services } = await this.getDependencyData(
      this.requestData
    );
    const userBusiness = `
    business name and description: <${businessInfo?.businessName}\n. ${businessInfo?.description}. ${businessInfo.additionalDetails}>
    business products: <${products}>\n
    business services: <${services}>
    `;
    const articleContent = await getArticleContent(businessArticle.link);

    const adPropmotion = await generateContentFromSummary(
      articleContent,
      JSON.stringify(userBusiness),
      { tone: this.requestData?.tone, quantity: this.requestData?.adQuantity }
    );
    const _ads = JSON.parse(adPropmotion!);
    await UserBusinessArticlesModel.findByIdAndUpdate(
      businessArticle._id,
      {
        $set: { extracted: true },
      },
      {
        new: true,
      }
    );

    _ads.forEach((element: any) => {
      element.sourceArticle = businessArticle._id;
      element.businessId = businessArticle.businessId;
    });

    const data = await AdPropmotionContentEntry.create(_ads);
    return data;
  };
}
