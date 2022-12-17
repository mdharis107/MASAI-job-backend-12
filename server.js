const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { jobRouter } = require("./routes/jobs.router");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the Home Page");
});

app.use(cors());

app.use("/jobs",jobRouter)

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (err) {
    console.log("Error connecting to DB");
    console.log(err);
  }
  console.log(`listening on PORT ${PORT}`);
});
