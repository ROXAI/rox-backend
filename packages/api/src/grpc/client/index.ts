import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

import { ProtoGrpcType } from "../protos/webscrapper";

const SERVER_IP = "0.0.0.0";
const PORT = "5000";
const PROTO_FILE = "../protos/webscrapper.proto";

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const client = new grpcObj.webscrapperPackage.WebScrapper(
  `${SERVER_IP}:${PORT}`,
  grpc.credentials.createInsecure()
);

const onClientReady = (link:string) => {
  return new Promise((resolve, reject) => {
    client.ScrapArticle({ url: link }, (err, result) => {
      if (err) {
        console.log("grpc ScrapArticle error", err);
        reject(err); // Reject the promise if there's an error
      } else {
        resolve(result); // Resolve the promise with the result
      }
    });
  });
};

export const grpcCrapArticleLink = (link:string) => {
  const deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 5);
  return new Promise((resolve, reject) => {
    client.waitForReady(deadline, (err) => {
      if (err) {
        console.log("grpc client error", err);
        reject(err);
      } else {
        resolve(onClientReady(link));
      }
    });
  });
};
