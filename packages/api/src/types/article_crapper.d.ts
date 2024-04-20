declare module "article_scrapper" {
  export function scrapeArticle(articleUrl: string): Promise<string>;
}
