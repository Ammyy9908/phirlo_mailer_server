const mongoose = require("mongoose");
require("dotenv").config();

const connect_db = async () => {
  try {
    const is_connected = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return is_connected;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = connect_db;
