var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var session = require("express-session");
var request = require("request");
var qstring = require("qs");
var cmongo = require("connect-mongo");
var mongoose= require("./db/connection");
var twitter = require("./lib/twitter_auth");

var app     = express();
var SMongo = cmongo(session);


var Mixologist = mongoose.model("Mixologist");
var Boombox = mongoose.model("Boombox");
var Photobooth = mongoose.model("Photobooth");

// if(process.env.NODE_ENV !== "production"){
//   var env   = require("./env");
//   process.env.session_secret = env.session_secret;
//   process.env.t_callback_url = env.t_callback_url;
//   process.env.t_consumer_key = env.t_consumer_key;
//   process.env.t_consumer_secret = env.t_consumer_secret;
// }

// app.use(session({
//   secret: process.env.session_secret,
//   resave: false,
//   saveUninitialized: false,
//   store: new SMongo({
//     mongooseConnection: mongoose.connection
//   })
// }));

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));
// app.use("/bower", express.static("bower_components"));
// app.use(function(req, res, next){
//   twitter.checkIfSignedIn(req, res, function(){
//     next();
//   });
// });

app.get("/", function(req, res){
  res.render("welcome");
});

app.get("/login/twitter", function(req, res){
  twitter.getSigninURL(req, res, function(url){
    res.redirect(url);
  });
});

app.get("/login/twitter/callback", function(req, res){
  twitter.whenSignedIn(req, res, function(){
    res.redirect("/");
  });
});
// Mixology
app.get("/mixologist", function(req, res){
  Mixologist.find({}).then(function(mixologists){
    res.render("mixologist-index", {
      mixologists: mixologists
    });
  });
});

app.get("/mixologist/:drink_name", function(req, res){
  Mixologist.findOne({drink_name: req.params.drink_name}).then(function(mixologist){
    res.render("mixologist-show", {
      mixologist: mixologist
    });
  });
});

app.post("/mixologist", function(req, res){
  Mixologist.create(req.body.mixologist).then(function(mixologist){
    res.redirect("/mixologist/" + mixologist.drink_name);
  });
});

app.post("/mixologist/:drink_name/delete", function(req, res){
  Mixologist.findOneAndRemove({drink_name: req.params.drink_name}).then(function(){
    res.redirect("/mixologist")
  });
});

app.post("/mixologist/:drink_name", function(req, res){
  Mixologist.findOneAndUpdate({drink_name: req.params.drink_name}, req.body.mixologist, {new: true}).then(function(mixologist){
    res.redirect("/mixologist/" + mixologist.drink_name);
  });
});

//boombox
app.get("/boombox", function(req, res){
  Photobooth.find({}).then(function(boomboxes){
    res.render("boombox-index", {
      boomboxes: boomboxes
    });
  });
});

app.get("/boombox/:playlist_name", function(req, res){
  Photobooth.findOne({playlist_name: req.params.playlist_name}).then(function(boombox){
    res.render("boombox-show", {
      boombox: boombox
    });
  });
});

app.post("/boombox", function(req, res){
  Photobooth.create(req.body.boombox).then(function(boombox){
    res.redirect("/boombox/" + boombox.playlist_name);
  });
});

app.post("/boombox/:playlist_name/delete", function(req, res){
  Photobooth.findOneAndRemove({playlist_name: req.params.playlist_name}).then(function(){
    res.redirect("/boombox")
  });
});

app.post("/boombox/:playlist_name", function(req, res){
  Photobooth.findOneAndUpdate({playlist_name: req.params.playlist_name}, req.body.boombox, {new: true}).then(function(boombox){
    res.redirect("/boombox/" + boombox.playlist_name);
  });
});

//photobooth

app.get("/photobooth", function(req, res){
  Photobooth.find({}).then(function(photobooths){
    res.render("photobooth-index", {
      photobooths: photobooths
    });
  });
});

app.get("/photobooth/:photo_name", function(req, res){
  Photobooth.findOne({photo_name: req.params.photo_name}).then(function(photobooth){
    res.render("photobooth-show", {
      photobooth: photobooth
    });
  });
});

app.post("/photobooth", function(req, res){
  Photobooth.create(req.body.photobooth).then(function(photobooth){
    res.redirect("/photobooth/" + photobooth.photo_name);
  });
});

app.post("/photobooth/:photo_name/delete", function(req, res){
  Photobooth.findOneAndRemove({photo_name: req.params.photo_name}).then(function(){
    res.redirect("/photobooth")
  });
});

app.post("/photobooth/:photo_name", function(req, res){
  Photobooth.findOneAndUpdate({photo_name: req.params.photo_name}, req.body.photobooth, {new: true}).then(function(photobooth){
    res.redirect("/photobooth/" + photobooth.photo_name);
  });
});


app.listen(app.get("port"), function(){
  console.log("Look at me all working and stuff!")
});
