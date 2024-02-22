import axios from "axios";
import { grpcCrapArticleLink } from "../grpc/client";
// import axiosRetry from 'axios-retry';

// axiosRetry(axios, { retries: 3 });
export class WebScrapperAPI {
  getArticleContent = async (articleLink: string) => {
    const data = (await grpcCrapArticleLink(articleLink)) as { data: string };
    return data.data;
  };
}
