var mongoose = require("mongoose");

var MixologistSchema = new mongoose.Schema(
  {
    drink_name: String,
    ingredients: [String],
    instructions: String
  }
);

mongoose.model("Mixologist", MixologistSchema);
mongoose.connect("mongodb://localhost/mixologist");

module.exports = mongoose;
