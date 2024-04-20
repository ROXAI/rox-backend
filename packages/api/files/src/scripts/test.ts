import * as cheerio from "cheerio";
import axios from "axios";
const test = async () => {
  try {
    const { data } = await axios(
      "https://www.vogue.com/article/simplified-skincare-routine"
    );
    // const data = res.json()
    const $ = cheerio.load(data);
    const content = $("article").text();
    console.log(content);
  } catch (error) {
    console.log("scrapper-error", error);
  }
};


// https://rsc.byu.edu/latter-day-saint-essentials/articles-faith
// "https://www.vogue.com/article/simplified-skincare-routine"
