const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

require('dotenv').config();

require('../db');
const { startConsumer } = require('../kafka/consumer');
const handler = require('./notification.handler');

const packageDef = protoLoader.loadSync(
  path.join(__dirname, '../../proto/notification.proto'),
  {
    keepCase: true
  }
);

const grpcObject = grpc.loadPackageDefinition(packageDef);
const NotificationService = grpcObject.NotificationService;

const server = new grpc.Server();

server.addService(NotificationService.service, handler);

const PORT = 50054;

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),   
  (err, port) => {

    if (err) {
      console.error("Notification gRPC failed:", err);
      return;
    }

    console.log(`Notification gRPC running on port ${port}`);
    server.start();
    startConsumer();
  }
);
