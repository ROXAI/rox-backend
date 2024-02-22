import axios from "axios";
// import axiosRetry from 'axios-retry';

// axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

const GOOGLE_SEARCH_EG_KEY = process.env.GOOGLE_SEARCH_EG_KEY;
const GOOGLE_SEARCH_EG_CX = process.env.GOOGLE_SEARCH_EG_CX;
export const GCPSearchAPI = async (q: string, startIndex: number = 1) => {
  const params = {
    key: GOOGLE_SEARCH_EG_KEY!,
    cx: GOOGLE_SEARCH_EG_CX!,
    q: q,
    start: String(startIndex),
  };
  const uri = `https://www.googleapis.com/customsearch/v1?${new URLSearchParams(
    params
  ).toString()}`;
  const { data } = await axios.get(uri);
  return data;
};
