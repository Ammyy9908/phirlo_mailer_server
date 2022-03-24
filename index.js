const express = require("express");
const cors = require("cors");
const connect_db = require("./utils/database_connection");
const api = require("./routes/api");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/mailerapi/", api);

app.get("/api", (req, res) => {
  res.send("API WORKING");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // Connection to database
  connect_db()
    .then((connected) => {
      if (connected) {
        console.log("Database is connected and listening on port " + port);
      } else {
        console.log("Error connecting to database");
      }
    })
    .catch((e) => {
      console.log(e.message);
    });
});
