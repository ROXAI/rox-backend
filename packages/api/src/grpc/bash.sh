#!/bin/bash

yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=src/grpc/protos/ src/grpc/protos/webscrapper.proto