// Original file: src/grpc/protos/webscrapper.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Article as _webscrapperPackage_Article, Article__Output as _webscrapperPackage_Article__Output } from '../webscrapperPackage/Article';
import type { ScrappedData as _webscrapperPackage_ScrappedData, ScrappedData__Output as _webscrapperPackage_ScrappedData__Output } from '../webscrapperPackage/ScrappedData';

export interface WebScrapperClient extends grpc.Client {
  ScrapArticle(argument: _webscrapperPackage_Article, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_webscrapperPackage_ScrappedData__Output>): grpc.ClientUnaryCall;
  ScrapArticle(argument: _webscrapperPackage_Article, metadata: grpc.Metadata, callback: grpc.requestCallback<_webscrapperPackage_ScrappedData__Output>): grpc.ClientUnaryCall;
  ScrapArticle(argument: _webscrapperPackage_Article, options: grpc.CallOptions, callback: grpc.requestCallback<_webscrapperPackage_ScrappedData__Output>): grpc.ClientUnaryCall;
  ScrapArticle(argument: _webscrapperPackage_Article, callback: grpc.requestCallback<_webscrapperPackage_ScrappedData__Output>): grpc.ClientUnaryCall;
  scrapArticle(argument: _webscrapperPackage_Article, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_webscrapperPackage_ScrappedData__Output>): grpc.ClientUnaryCall;
  scrapArticle(argument: _webscrapperPackage_Article, metadata: grpc.Metadata, callback: grpc.requestCallback<_webscrapperPackage_ScrappedData__Output>): grpc.ClientUnaryCall;
  scrapArticle(argument: _webscrapperPackage_Article, options: grpc.CallOptions, callback: grpc.requestCallback<_webscrapperPackage_ScrappedData__Output>): grpc.ClientUnaryCall;
  scrapArticle(argument: _webscrapperPackage_Article, callback: grpc.requestCallback<_webscrapperPackage_ScrappedData__Output>): grpc.ClientUnaryCall;
  
}

export interface WebScrapperHandlers extends grpc.UntypedServiceImplementation {
  ScrapArticle: grpc.handleUnaryCall<_webscrapperPackage_Article__Output, _webscrapperPackage_ScrappedData>;
  
}

export interface WebScrapperDefinition extends grpc.ServiceDefinition {
  ScrapArticle: MethodDefinition<_webscrapperPackage_Article, _webscrapperPackage_ScrappedData, _webscrapperPackage_Article__Output, _webscrapperPackage_ScrappedData__Output>
}
