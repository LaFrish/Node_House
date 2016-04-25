var mongoose = require("mongoose");

var MixologistSchema = new mongoose.Schema(
  {
    drink_name: String,
    ingredients: [String],
    instructions: String
  }
);

mongoose.model("Mixologist", MixologistSchema);
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
}else{
  mongoose.connect("mongodb://localhost/mixologist");
}

module.exports = mongoose;
