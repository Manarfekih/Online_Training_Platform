require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const setupGraphQL = require("./graphql/server");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/notifications", notificationRoutes);

app.use(setupGraphQL());

app.use((req, res) => {
  res.status(404).json({
    error: `Cannot ${req.method} ${req.originalUrl}`
  });
});

module.exports = app;
