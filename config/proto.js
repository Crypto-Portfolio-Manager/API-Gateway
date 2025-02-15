const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH_USER = '/Users/stepansalikov/CryptoManager/API-Gateway/proto/user.proto'
const packageDefinitionUser = protoLoader.loadSync(PROTO_PATH_USER, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const usersProto = grpc.loadPackageDefinition(packageDefinitionUser).usersproto;
const clientUser = new usersProto.Greeter('localhost:50051', grpc.credentials.createInsecure());


const PROTO_PATH_PORTFOLIO = '/Users/stepansalikov/CryptoManager/API-Gateway/proto/portfolio.proto'
const packageDefinitionPortfolio = protoLoader.loadSync(PROTO_PATH_PORTFOLIO, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const portfolioProto = grpc.loadPackageDefinition(packageDefinitionPortfolio).portfolioproto;
const clientPortfolio = new portfolioProto.Portfolio('localhost:50052', grpc.credentials.createInsecure());

module.exports = {clientUser, clientPortfolio};