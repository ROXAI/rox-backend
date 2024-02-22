import OpenAI from "openai";
import { getAppMessageForPost } from "../../data/gpt-message";
import { getAppMessageForGCPSearchQuery } from "../../data/bus/gpt-system-message";
export const get_completion_from_messages = async (
  messages: any,
  model = "gpt-3.5-turbo-1106",
  temperature = 0,
  max_tokens = 500
) => {
  const key = process.env.GPT_SK_KEY;
  const openai = new OpenAI({
    apiKey: key,
  });

  const response = await openai.chat.completions.create({
    model: model,
    messages: messages,
    temperature: temperature,
    max_tokens: max_tokens,
  });
  return response.choices[0].message["content"];
};

export class ScrappedDataGPTResponse {
  async generateContentFromSummary(
    articleSummary: string,
    businessInfo: string,
    config: {
      tone: string;
      quantity?: number;
    }
  ) {
    const appMessage = getAppMessageForPost(
      articleSummary,
      businessInfo,
      config
    );
    const response = await get_completion_from_messages(appMessage);
    return response;
  }

  GCP_API_QueryString = async (businessInfo: string): Promise<any> => {
    const appMessage = getAppMessageForGCPSearchQuery(businessInfo);
    const qeuryString = await get_completion_from_messages(appMessage);
    const jsonArray = JSON.parse(qeuryString!);
    return jsonArray["q"].join(" OR ");
  };
}
