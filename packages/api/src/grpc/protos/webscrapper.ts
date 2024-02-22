import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { WebScrapperClient as _webscrapperPackage_WebScrapperClient, WebScrapperDefinition as _webscrapperPackage_WebScrapperDefinition } from './webscrapperPackage/WebScrapper';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  webscrapperPackage: {
    Article: MessageTypeDefinition
    ScrappedData: MessageTypeDefinition
    WebScrapper: SubtypeConstructor<typeof grpc.Client, _webscrapperPackage_WebScrapperClient> & { service: _webscrapperPackage_WebScrapperDefinition }
  }
}

