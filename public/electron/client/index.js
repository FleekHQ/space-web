const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const SERVER_ADDRESS = '0.0.0.0:9999';

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(path.join(__dirname, 'space.proto'), {
    oneofs: true,
    longs: String,
    enums: String,
    keepCase: true,
    defaults: true,
  }),
);

const client = new proto.space.SpaceApi(
  SERVER_ADDRESS,
  grpc.credentials.createInsecure(),
);

module.exports = client;
