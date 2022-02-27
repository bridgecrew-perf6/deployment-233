const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // allow us to get the data from the post request
const path = require("path");

const items = require("./routes/api/Items");

const app = express();

app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("Mongo db connected"))
  .catch((e) => console.log("ERROR", e));

app.use("/api/items", items);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server started on ${port}`));
