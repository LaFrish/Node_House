var mongoose = require("mongoose");
mongoose.createConnection("mongodb://localhost/");

var MixologistSchema = new mongoose.Schema(
  {
    drink_name: String,
    ingredients: [String],
    instructions: String
  }
);

var BoomboxSchema = new mongoose.Schema(
  {
    playlist_name: String,
    playlist_url: String
  }
);

var PhotoboothSchema = new mongoose.Schema(
  {
    photo_name: String,
    photo_type: String
  }
);


//from documentation

// Important: the actual interaction with the data happens with the Model that you obtain through mongoose.model or db.model. That's the object that you can instantiate or that you can call .find(), .findOne(), etc upon. Don't confuse schemas and actual models!

mongoose.model("Mixologist", MixologistSchema);
mongoose.model("Boombox", BoomboxSchema);
mongoose.model("Photobooth", PhotoboothSchema);


module.exports = mongoose;
