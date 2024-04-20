const delimiter = "####";

const systemMessageGenerator = (tone: string = "", quantity = 3) => {
  const system_message2 = `
  you will be provided with an article related to a \n
  user business delimited with ${delimiter} characters.

  you are to do the following task:
  ${delimiter} derive insight from the article and \n
  draft ${quantity} short promotion ad content to be posted on 
  social media. the content should not be more than 60 words. \n
  ${delimiter} the content should be tailored to promoting our business and \
  position us as an expert in the field. Include relevant hashtags and emojis. \n
  ${delimiter} ${tone} \n
  ${delimiter} provide your output in json format with key: text. \n
   use this template: [{key:contentValue}].
`;
  return system_message2;
};

export const getAppMessageForPost = (
  user_message: string,
  businessInfo: string,
  config: {
    tone: string;
    quantity?: number;
  }
) => {
  return [
    {
      role: "system",
      content: systemMessageGenerator(config.tone, config.quantity),
    },
    {
      role: "assistant",
      content: `relevant user business info: \n ${businessInfo}`,
    },
    { role: "user", content: `${delimiter}${user_message}${delimiter}` },
  ];
};
