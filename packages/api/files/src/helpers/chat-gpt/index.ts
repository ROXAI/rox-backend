import OpenAI from "openai";
import {
  adPropmotionOutPutShema,
  getAppMessageForPost,
} from "../../data/gpt-message";
import {
  GCPSearchQueryPrompt,
  busines_keywords_outputSchema,
} from "../../data/bus/gpt-system-message";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/dist/prompts";
export const get_completion_from_messages = async (
  prompt: ChatPromptTemplate<any, any>,
  outputFormat: any,
  model = "gpt-3.5-turbo-1106"
) => {
  // const key = process.env.GPT_SK_KEY;
  // const openai = new OpenAI({
  //   apiKey: key,
  // });

  const chatModel = new ChatOpenAI({
    temperature: 0,
    model: model,
  });

  const modelWithStructuredOutput =
    chatModel.withStructuredOutput(outputFormat);
  const chain = prompt.pipe(modelWithStructuredOutput);
  return await chain.invoke({});

  // const response = await openai.chat.completions.create({
  //   model: model,
  //   messages: messages,
  //   temperature: temperature,
  //   max_tokens: max_tokens,
  // });
  // return response.choices[0].message["content"];
};

export class ScrappedDataGPTResponse {
  generateContentFromSummary = async (
    articleSummary: string,
    businessInfo: string,
    config: {
      tone: string;
      quantity?: number;
    }
  ) => {
    const appMessage = getAppMessageForPost(
      articleSummary,
      businessInfo,
      config
    );
    const response = await get_completion_from_messages(
      appMessage,
      adPropmotionOutPutShema
    );
    return response;
  };

  GCP_API_QueryString = async (businessInfo: string): Promise<any> => {
    const appMessage = GCPSearchQueryPrompt(businessInfo);
    const qeuryString = await get_completion_from_messages(
      appMessage,
      busines_keywords_outputSchema
    );
    return qeuryString["q"].join(" OR ");
  };
}
