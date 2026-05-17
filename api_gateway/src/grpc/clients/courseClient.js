const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
require('dotenv').config();

const packageDef = protoLoader.loadSync(
  path.join(__dirname, '../../../proto/course.proto'),
  {
    keepCase: true
  }
);

const grpcObject = grpc.loadPackageDefinition(packageDef);

const CourseService = grpcObject.CourseService;

const client = new CourseService(
  process.env.COURSE_SERVICE_URL,
  grpc.credentials.createInsecure()
);

module.exports = client;
