const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Book = new Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    collection: "books",
  }
);

//Export the module
module.exports = mongoose.model("Book", Book);
