import { scrapeArticle } from "./web-scrapper/article_scrapper";

export class WebScrapperAPI {
  getArticleContent = async (articleLink: string) => {
    const data = await scrapeArticle(articleLink);
    return data;
  };
}
