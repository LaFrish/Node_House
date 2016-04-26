var mongoose = require("mongoose");


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

var db = mongoose.createConnection("mongodb://localhost/"),
  Mixologist = db.model("Mixologist");
  Boombox = db.model("Boombox");
  Photobooth = db.model("Photobooth");

// Important: the actual interaction with the data happens with the Model that you obtain through mongoose.model or db.model. That's the object that you can instantiate or that you can call .find(), .findOne(), etc upon. Don't confuse schemas and actual models!

mongoose.model("Mixologist", MixologistSchema);
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
}else{
  mongoose.connect("mongodb://localhost/mixologist");
}
mongoose.model("Boombox", BoomboxSchema);
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
}else{
  mongoose.connect("mongodb://localhost/boombox");
}

mongoose.model("Photobooth", PhotoboothSchema);
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
}else{
  mongoose.connect("mongodb://localhost/photobooth");
}


module.exports = mongoose;
mixologist
boombox
photobooth
