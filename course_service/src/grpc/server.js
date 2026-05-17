const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const handler = require('./course.handler');

const packageDef = protoLoader.loadSync(
  path.join(__dirname, '../../proto/course.proto'),
  {
    keepCase: true
  }
);

const grpcObject = grpc.loadPackageDefinition(packageDef);
const coursePackage = grpcObject.CourseService;

const server = new grpc.Server();

server.addService(coursePackage.service, handler);

server.bindAsync(
  "0.0.0.0:50052",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Course gRPC Service running on port 50052");
    server.start();
  }
);
