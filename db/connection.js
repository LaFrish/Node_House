var mongoose = require("mongoose");


var MixologistSchema = new mongoose.Schema(
  {
    drink_name: String,
    ingredients: [String],
    instructions: String
  }
);
var PhotoboothSchema = new mongoose.Schema(
  {
    photo_id: Number
  }
);

var ContestSchema = new mongoose.Schema(
  {
   name: String,
   street_address: String,
   city: String,
   state: String,
   zip_code: Number,
   email: String
  }
);
mongoose.model("Mixologist", MixologistSchema);
mongoose.model("Photobooth", PhotoboothSchema);
mongoose.model("Contest", ContestSchema);

if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URI);
}else{
  mongoose.connect("mongodb://heroku_0rmqjwc9:k50hblm5koar4cihvecgh4sthr@ds023105.mlab.com:23105/heroku_0rmqjwc9");
}


module.exports = mongoose;
