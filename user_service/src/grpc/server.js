const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const userHandler = require('./user.handler');

const packageDef = protoLoader.loadSync(
  path.join(__dirname, '../../proto/user.proto'),
  {
    keepCase: true
  }
);

const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.UserService;

const server = new grpc.Server();

server.addService(userPackage.service, userHandler);

const PORT = 50051;

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("User gRPC failed:", err);
      return;
    }

    console.log(`User gRPC Service running on port ${port}`);

    server.start(); 
  }
);
