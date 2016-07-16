var mongoose = require("mongoose");
mongoose.connect("mongodb://heroku_0rmqjwc9:k50hblm5koar4cihvecgh4sthr@ds023105.mlab.com:23105/heroku_0rmqjwc9");


var MixologistSchema = new mongoose.Schema(
  {
    drink_name: String,
    ingredients: [String],
    instructions: String
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
    photo_id: Number
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
   street_address: String,
   city: String,
   state: String,
   zip_code: Number,
   email: String
  }
);

mongoose.model("Mixologist", MixologistSchema);
// mongoose.model("Boombox", BoomboxSchema);
mongoose.model("Photobooth", PhotoboothSchema);
mongoose.model("Calendar", CalendarSchema);
mongoose.model("Contest", ContestSchema);

module.exports = mongoose;
