const express = require("express");
const bodyParser = require("body-parser");
const connectToMongoDB = require("./db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api", userRoutes);

const port = process.env.PORT || 5000;

connectToMongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error starting the server:", err);
  });
