const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/user.routes");
const gistRouter = require("./routes/gist.routes");
const logRouter = require("./routes/log.routes");
var cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    success: 1,
    message: "Hello. This is a NodeJS API by Bamidele Moses O.",
  });
});

app.use("/api/users", userRouter);
app.use("/api/gists", gistRouter);
app.use("/api/logs", logRouter);

app.listen(port, (err) => {
  if (err) console.log(err.message);
  console.log(`Running on port ${port}`);
});
