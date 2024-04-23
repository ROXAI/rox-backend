import { z } from "zod";
import { ChatPromptTemplate } from "@langchain/core/prompts";


const delimiter = "####";
const busines_keywords_system_message = `
you are a professional social media marketer for large and small
business enterprise with 10 years of professional experience.

you will be provided with a user query delimetered by ${delimiter}
characters.

Ensure that your result is good enough to get the latest and
trending articles relevant to the user business and works perfectly with google JSON API.
`;

const skinCare_user_message = `
generate query strings for the Google Search Engine API.
the query should be formulated based on specific keywords
and topics on the business description, categories and sub-categories
`;

export const GCPSearchQueryPrompt = (businessInfo: string) => {
  return ChatPromptTemplate.fromMessages([
    ["system", busines_keywords_system_message],
    ["assistant", `relevant user business info: \n ${businessInfo}`],
    ["human", skinCare_user_message],
  ]);
};

export const busines_keywords_outputSchema = z.object({
  q: z.array(z.string()),
});
