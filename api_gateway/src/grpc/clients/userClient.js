const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
require('dotenv').config();

const packageDef = protoLoader.loadSync(
  path.join(__dirname, '../../../proto/user.proto'),
  {
    keepCase: true
  }
);

const grpcObject = grpc.loadPackageDefinition(packageDef);

const UserService = grpcObject.UserService;

const client = new UserService(
  process.env.USER_SERVICE_URL,
  grpc.credentials.createInsecure()
);

module.exports = client;
