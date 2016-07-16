var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var session = require("express-session");
var request = require("request");
var qstring = require("qs");
var cmongo = require("connect-mongo");
var mongoose= require("./db/connection");
var twitter = require("./lib/twitter_auth");
var jquery = require("jquery");
var jsdom = require("jsdom");

var app     = express();
var SMongo = cmongo(session);


var Mixologist = mongoose.model("Mixologist");
// var Boombox = mongoose.model("Boombox");
var Photobooth = mongoose.model("Photobooth");
var Calendar = mongoose.model("Calendar");
var Contest = mongoose.model("Contest");


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

app.set("port", process.env.PORT || 3000);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

app.use("/assets", express.static("public"));
app.use("/bower", express.static("bower_components"));
app.use(parser.urlencoded({extended: true}));
// app.use(function(req, res, next){
//   twitter.checkIfSignedIn(req, res, function(){
//     next();
//   });
// });


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

// app.get("/logout, function(req, res)"{
//   req.session.destroy();
//   res.redirect("/");
// });

// Mixology
app.get("/api/mixologist", function(req, res){
  Mixologist.find({}).then(function(mixologists){
    console.log(mixologists);
    res.json("mixologists");
  });
});

app.get("/api/mixologist/:drink_name", function(req, res){
  console.log(req);
  Mixologist.findOne({drink_name: req.params.drink_name}).then(function(mixologist){
    console.log(mixologist);
    res.json("mixologist");
  });
});


app.delete("/api/mixologist/:drink_name", function(req, res){
  Mixologist.findOneAndRemove({drink_name: req.params.drink_name}).then(function(){
    res.json({success: true});
  });
});

app.patch("/api/mixologist/:drink_name", function(req, res){
  Mixologist.findOneAndUpdate({drink_name: req.params.drink_name}, req.body.mixologist, {new: true}).then(function(mixologist){
    res.json("mixologist");
  });
});

app.post("/api/mixologist", function(req, res){
  Mixologist.create(req.body.mixologist).then(function(mixologist){
    res.json("mixologist");
  });
});


//boombox
// app.get("/api/boombox", function(req, res){
//   Boombox.find({}).then(function(boomboxes){
//     res.json(boomboxes);
//   });
// });
//
// app.get("/api/boombox/:playlist_name", function(req, res){
//   Boombox.findOne({playlist_name: req.params.playlist_name}).then(function(boombox){
//     res.json(boombox);
//   });
// });
//
// app.post("/api/boombox", function(req, res){
//   Boombox.create(req.body.boombox).then(function(boombox){
//     res.json(boombox);
//   });
// });
//
// app.delete("/api/boombox/:playlist_name", function(req, res){
//   Boombox.findOneAndRemove({playlist_name: req.params.playlist_name}).then(function(){
//     res.json({success: true});
//   });
// });
//
// app.put("/api/boombox/:playlist_name", function(req, res){
//   Boombox.findOneAndUpdate({playlist_name: req.params.playlist_name}, req.body.boombox, {new: true}).then(function(boombox){
//     res.json(boombox);
//   });
// });

// //photobooth

app.get("/api/photobooth", function(req, res){
  Photobooth.find({}).then(function(photobooths){
    res.json("photobooths");
  });
});

app.get("/api/photobooth/:photo_name", function(req, res){
  Photobooth.findOne({photo_id: req.params.photo_id}).then(function(photobooth){
    res.json(photobooth);
  });
});

app.post("/api/photobooth", function(req, res){
  Photobooth.create(req.body.photobooth).then(function(photobooth){
    res.json(photobooth);
  });
});

app.delete("/api/photobooth/:photo_name/delete", function(req, res){
  Photobooth.findOneAndRemove({photo_id: req.params.photo_id}).then(function(){
    res.json({success: true});
  });
});

app.put("/api/photobooth/:photo_name", function(req, res){
  Photobooth.findOneAndUpdate({photo_id: req.params.photo_id}, req.body.photobooth, {new: true}).then(function(photobooth){
    res.json(photobooth);
  });
});

//calendar

app.get("/api/calendar", function(req, res){
  Calendar.find({}).then(function(calendars){
    res.json(calendars);
  });
});

app.get("/api/calendar/:date", function(req, res){
  Calendar.findOne({date: req.params.date}).then(function(calendar){
    res.json(calendar);
  });
});

app.post("/api/calendar", function(req, res){
  Calendar.create(req.body.calendar).then(function(calendar){
    res.json(calendar);
  });
});

app.post("/api/calendar/:date", function(req, res){
  Calendar.findOneAndRemove({date: req.params.date}).then(function(){
    res.json(calendar);
  });
});

app.put("/api/calendar/:date", function(req, res){
  Calendar.findOneAndUpdate({date: req.params.date}, req.body.calendar, {new: true}).then(function(calendar){
    res.json({success: true});
  });
});

//contest

app.get("/api/contest", function(req, res){
  Contest.find({}).then(function(contests){
    res.json(contest);
  });
});

app.get("/api/contest/:entry", function(req, res){
  Contest.findOne({entry: req.params.entry}).then(function(contest){
    res.json(contest);
  });
});

app.post("/api/contest", function(req, res){
  Contest.create(req.body.contest).then(function(contest){
    res.json(contest);
  });
});

app.delete("/api/contest/:entry", function(req, res){
  Contest.findOneAndRemove({entry: req.params.entry}).then(function(){
    res.json({success: true});
  });
});

app.post("/api/contest/:entry", function(req, res){
  Contest.findOneAndUpdate({entry: req.params.entry}, req.body.contest, {new: true}).then(function(contest){
    res.json(contest);
  });
});

app.get("/*", function(req, res){
  res.render("Node_House");
});

app.listen(app.get("port"), function(){
  console.log("Look at me all working and stuff!")
});
