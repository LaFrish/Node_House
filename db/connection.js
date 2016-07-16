var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/nodehouse");

var MixologistSchema = new mongoose.Schema(
  {
    drink_name: String,
    ingredients: [String],
    instructions: String,
    photo_url: String
  }
);
//
// var BoomboxSchema = new mongoose.Schema(
//   {
//     playlist_name: String,
//     playlist_url: String,
//     photo_url: String
//   }
// );

var PhotoboothSchema = new mongoose.Schema(
  {
    photo_name: String,
    photo_type: String
  }
);

var CalendarSchema = new mongoose.Schema(
  {
    month: String
  }
);

var ContestSchema = new mongoose.Schema(
  {
   name: String,
   address: [String],
   email: String,
  }
);

mongoose.model("Mixologist", MixologistSchema);
// mongoose.model("Boombox", BoomboxSchema);
mongoose.model("Photobooth", PhotoboothSchema);
mongoose.model("Calendar", CalendarSchema);
mongoose.model("Contest", ContestSchema);

module.exports = mongoose;
