const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
require('dotenv').config();

const packageDef = protoLoader.loadSync(
  path.join(__dirname, '../../../proto/notification.proto'),
  {
    keepCase: true
  }
);

const grpcObject = grpc.loadPackageDefinition(packageDef);

const NotificationService = grpcObject.NotificationService;

const client = new NotificationService(
  process.env.NOTIFICATION_SERVICE_URL,
  grpc.credentials.createInsecure()
);

module.exports = client;
