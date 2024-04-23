import { IBusinessProfile, IUserBusinessArticles } from "../models/domain";
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
  private businessProfileId: string;
  private requestData: GenerateAdDependencyData;

  constructor(
    userId: string,
    businessProfileId: string,
    data: GenerateAdDependencyData
  ) {
    this.userId = userId;
    this.businessProfileId = businessProfileId;
    this.requestData = data;
  }

  getNotExtractedArticles = async () => {
    const businessArticle = (await UserBusinessArticlesModel.findOne({
      businessProfileId: convertToObjectId(this.businessProfileId as string),
      extracted: false,
    })) as IUserBusinessArticles;
    return businessArticle;
  };

  getExtractedArticles = async () => {
    const articleLinks = await UserBusinessArticlesModel.find({
      businessProfileId: convertToObjectId(this.businessProfileId as string),
      extracted: true,
    }).select("link");
    return articleLinks;
  };

  getUserBusinessQueryString = async () => {
    const userBusiness = await UserBusiness.findOne({
      _id: convertToObjectId(this.businessProfileId),
    }).select("queryString");
    return userBusiness.queryString as string;
  };

  getDependencyData = async (
    data: GenerateAdDependencyData
  ): Promise<DependencyData> => {
    let products = [];
    let services = [];
    const businessInfo = (await UserBusiness.findOne({
      _id: convertToObjectId(this.businessProfileId),
    }).select([
      "businessName",
      "description",
      "additionalDetails",
    ])) as IBusinessProfile;

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
    console.log("====================================");
    console.log(queryString);
    console.log("====================================");
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
        (item: any) => (item.businessProfileId = this.businessProfileId)
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
        hasLink.businessProfileId = this.businessProfileId;
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
    console.log("====started=====");
    const { businessInfo, products, services } = await this.getDependencyData(
      this.requestData
    );
    const userBusiness = `
    business name and description: <${businessInfo?.businessName}\n. ${businessInfo?.description}. ${businessInfo.additionalDetails}>
    `;
    console.log("====userBusiness===========");
    const articleContent = await getArticleContent(businessArticle.link);
    
    console.log("====================================");
      console.log("articleContent");
      console.log("====================================");
    const adPropmotions = await generateContentFromSummary(
      articleContent,
      JSON.stringify(userBusiness),
      { tone: this.requestData?.tone, quantity: this.requestData?.adQuantity }
    );
    console.log("dddddddd", adPropmotions);
    await UserBusinessArticlesModel.findByIdAndUpdate(
      businessArticle._id,
      {
        $set: { extracted: true },
      },
      {
        new: true,
      }
    );

    adPropmotions.forEach((element: any) => {
      element.sourceArticle = businessArticle._id;
      element.businessProfileId = businessArticle.businessProfileId;
    });

    const data = await AdPropmotionContentEntry.create(adPropmotions);
    return data;
  };
}
