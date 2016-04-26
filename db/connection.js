var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/beachhouse");

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

mongoose.model("Mixologist", MixologistSchema);
mongoose.model("Boombox", BoomboxSchema);
mongoose.model("Photobooth", PhotoboothSchema);


module.exports = mongoose;
