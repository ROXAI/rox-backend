import { AdPropmotionContentEntry } from "../models/schema";
import { adContentStatus } from "../types/enum";

const AdPropmotionContentEntryData = [
  {
    sourceArticle: "65a6270126ffbaced7ee1721",
    businessId: "657c29010812b7ca1939153d",
    text: "a bla bla bla work of art",
    status: adContentStatus.ACTIVE,
  },
  {
    sourceArticle: "65a6270126ffbaced7ee1721",
    businessId: "657c29010812b7ca1939153d",
    text: "dalarin is the best language in china",
    status: adContentStatus.ACTIVE,
  },
  {
    sourceArticle: "65a6270126ffbaced7ee1720",
    businessId: "658c97a0afdc58121fb17995",
    text: "the us and the west is fooked up right now",
    status: adContentStatus.ACTIVE,
  },
  {
    sourceArticle: "65a6270126ffbaced7ee1720",
    businessId: "658c97a0afdc58121fb17995",
    text: "let there be peace in the world",
    status: adContentStatus.DRAFT,
  },
  {
    sourceArticle: "65a6270126ffbaced7ee1722",
    businessId: "658cab53afdc58121fb17e6d",
    text: "coming from america is the greatest movie on earth",
    status: adContentStatus.DRAFT,
  },
  {
    sourceArticle: "65a6270126ffbaced7ee1722",
    businessId: "658cab53afdc58121fb17e6d",
    text: "its so good to be from africa",
    status: adContentStatus.POSTED,
  },
];

export const populate = async () => {
  const data = await AdPropmotionContentEntry.create(
    AdPropmotionContentEntryData
  );
  console.log("====================================");
  console.log(data);
  console.log("====================================");
};
