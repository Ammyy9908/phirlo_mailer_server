const { model, Schema } = require("mongoose");

const mailer_schema = new Schema({
  contact: {
    type: "Object",
    required: true,
  },
});

module.exports = model("Mailer", mailer_schema);
