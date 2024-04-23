import { z } from "zod";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const systemMessageGenerator = (tone: string = "", quantity = 3) => {
  const delimiter = "####";
  return `
  you will be provided with an article related to a \n
  user business delimited with ${delimiter} characters.

  you are to do the following task:
  ${delimiter} derive insight from the article and \n
  draft ${quantity} short promotion ad content to be posted on 
  social media. the content should not be more than 60 words. \n
  ${delimiter} the content should be tailored to promoting users business and \
  position them as an expert in the field. Include relevant hashtags and emojis. \n
  ${delimiter} ${tone} \n
`;
};

export const getAppMessageForPost = (
  user_message: string,
  businessInfo: string,
  config: {
    tone: string;
    quantity?: number;
  }
) => {
  const delimiter = "####";
  return ChatPromptTemplate.fromMessages([
    ["system", systemMessageGenerator(config.tone, config.quantity)],
    ["assistant", `relevant user business info: \n ${businessInfo}`],
    ["human", `${delimiter}${user_message}${delimiter}`],
  ]);
};

export const adPropmotionOutPutShema = z.array(z.object({ text: z.string() }));
