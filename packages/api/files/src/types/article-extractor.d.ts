declare module 'article-extractor' {
    export interface Article {
      /**
       * The main text content of the article.
       */
      text: string;
  
      /**
       * The domain of the article URL. (May not be available in all packages)
       */
      domain?: string;
  
      /**
       * The author of the article. (May not be available in all packages)
       */
      author?: string;
    }
  
    /**
     * Extracts information from a given URL.
     * 
     * @param url The URL of the article to extract information from.
     * 
     * @returns A promise that resolves to an Article object containing extracted data.
     *          Rejects with an error if extraction fails.
     */
    export function extract(url: string): Promise<Article>;
  }