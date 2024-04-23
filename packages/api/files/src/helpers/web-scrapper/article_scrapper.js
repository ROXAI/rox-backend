var extractor = require("article-extractor");
const cheerio = require("cheerio");

export const scrapeArticle = (articleUrl) => {
  return new Promise((resolve, reject) => {
    console.log("========started crapping article=====" + articleUrl);
    extractor.extractData(articleUrl, function (err, data) {
      const $ = cheerio.load(data.summary);
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      const content = $("body").text();

      resolve(content);
      reject(err);
    });
  });
};

// https://www.clinique.com/skin-concern/acne-skincare