const delimiter = "####";

export const busines_keywords_system_message = `
you are a professional social media marketer for large and small
business enterprise with 10 years of professional experience.

you will be provided with a user query delimetered by ${delimiter}
characters.

Ensure that your result is good enough to get the latest and
trending articles relevant to the user business, that the user 
can derive insight from to create promotional content.

Ensure to return a JSON array of formatted strings that works well with News API
AND google search engine API.

the JSON array should have the key: <q>
`;

export const skinCare_user_message = `
generate query strings for the Google Search Engine API.
the query should be formulated based on specific keywords
and topics on the business description, categories and sub-categories
`;

export const getAppMessageForGCPSearchQuery = (businessInfo:string) => {
  return [
    { role: "system", content: busines_keywords_system_message },
    {
      role: "assistant",
      content: `relevant user business info: \n ${businessInfo}`,
    },
    { role: "user", content:  `${delimiter}${skinCare_user_message}${delimiter}` },
  ];
};
