var extractor = require("article-extractor");
const cheerio = require("cheerio");

export const scrapeArticle = (articleUrl) => {
  return new Promise((resolve, reject) => {
    extractor.extractData(articleUrl, function (err, data) {
      const $ = cheerio.load(data.summary);
      const content = $("body").text();
      resolve(content);
      reject(err);
    });
  });
};