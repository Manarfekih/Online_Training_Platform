const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const kafkaProducer = require('../kafka/producer');
const handler = require('./enrollment.handler');

const packageDef = protoLoader.loadSync(
  path.join(__dirname, '../../proto/enrollment.proto'),
  {
    keepCase: true
  }
);

const grpcObject = grpc.loadPackageDefinition(packageDef);
const enrollmentPackage = grpcObject.EnrollmentService;

const server = new grpc.Server();

server.addService(enrollmentPackage.service, handler);

const PORT = 50053;

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  async (err, port) => {

    if (err) {
      console.error("gRPC binding failed:", err);
      return;
    }

    await kafkaProducer.connectProducer();

    console.log(`Enrollment gRPC Service running on port ${port}`);
  }
);
