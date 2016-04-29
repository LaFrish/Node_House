var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var session = require("express-session");
var request = require("request");
var qstring = require("qs");
var cmongo = require("connect-mongo");
var mongoose= require("./db/connection");
var twitter = require("./lib/twitter_auth");
var sass = require("node-sass");
var jquery = require("jquery");
var jsdom = require("jsdom");

var app     = express();
var SMongo = cmongo(session);


var Mixologist = mongoose.model("Mixologist");
// var Boombox = mongoose.model("Boombox");
// var Photobooth = mongoose.model("Photobooth");
// var Calendar = mongoose.model("Calendar");
// var Contest = mongoose.model("Contest");


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
    res.json(mixologists);
  });
});

app.get("/api/mixologist/:drink_name", function(req, res){
  Mixologist.findOne({drink_name: req.params.drink_name}).then(function(mixologist){
    res.json(mixologist);
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
// app.get("api/boombox", function(req, res){
//   Photobooth.find({}).lean().exec().then(function(boomboxes){
//     res.json(boombox);
//   });
// });
//
// app.get("api/boombox/:playlist_name", function(req, res){
//   Photobooth.findOne({playlist_name: req.params.playlist_name}).then(function(boombox){
//     boombox.isCurrentUser = (boombox._id == req.session.boombox_id)
//     res.json(boombox);
//   });
// });
//
// app.post("api/boombox", function(req, res){
//   Photobooth.create(req.body.boombox).then(function(boombox){
//     res.redirect("/boombox/" + boombox.playlist_name);
//   });
// });
//
// app.delete("api/boombox/:playlist_name/delete", function(req, res){
//   Photobooth.findOneAndRemove({playlist_name: req.params.playlist_name}).then(function(){
//     res.json({success: true});
//   });
// });
//
// app.put("api/boombox/:playlist_name", function(req, res){
//   Photobooth.findOneAndUpdate({playlist_name: req.params.playlist_name}, req.body.boombox, {new: true}).then(function(boombox){
//     res.json(boombox);
//   });
// });
//
// //photobooth
//
// app.get("api/photobooth", function(req, res){
//   Photobooth.find({}).lean().exec().then(function(photobooths){
//     res.json("photobooth");
//   });
// });
//
// app.get("api/photobooth/:photo_name", function(req, res){
//   Photobooth.findOne({photo_name: req.params.photo_name}).then(function(photobooth){
//     photobooth.isCurrentUser = (photobooth._id == req.session.photobooth_id)
//     res.json(photobooth);
//   });
// });
//
// app.post("api/photobooth", function(req, res){
//   Photobooth.create(req.body.photobooth).then(function(photobooth){
//     res.redirect("api/photobooth/" + photobooth.photo_name);
//   });
// });
//
// app.delete("api/photobooth/:photo_name/delete", function(req, res){
//   Photobooth.findOneAndRemove({photo_name: req.params.photo_name}).then(function(){
//     res.json({success: true});
//   });
// });
//
// app.put("api/photobooth/:photo_name", function(req, res){
//   Photobooth.findOneAndUpdate({photo_name: req.params.photo_name}, req.body.photobooth, {new: true}).then(function(photobooth){
//     res.json(photobooth);
//   });
// });
//
// //calendar
// //
// // app.get("api/calendar", function(req, res){
// //   Calendar.find({}).lean().exec().then(function(calendars){
// //     res.json(calendar);
// //   });
// // });
// //
// // app.get("api/calendar/:date", function(req, res){
// //   Calendar.findOne({date: req.params.date}).then(function(calendar){
// //     res.render(calendar);
// //     calendar.isCurrentUser = (calendar._id == req.session.calendar_id)
// //     res.json(calendar);
// //   });
// // });
// //
// // app.post("api/calendar", function(req, res){
// //   Calendar.create(req.body.calendar).then(function(calendar){
// //     res.redirect("api/calendar/" + calendar.date);
// //   });
// // });
// //
// // app.post("api/calendar/:date/delete", function(req, res){
// //   Calendar.findOneAndRemove({date: req.params.date}).then(function(){
// //     res.redirect("api/calendar")
// //   });
// // });
// //
// // app.put("api/calendar/:date", function(req, res){
// //   Calendar.findOneAndUpdate({date: req.params.date}, req.body.calendar, {new: true}).then(function(calendar){
// //     res.json({success: true});
// //   });
// // });
//
// //contest
//
// app.get("api/contest", function(req, res){
//   Contest.find({}).lean().exec().then(function(contests){
//     res.render(contest);
//   });
// });
//
// app.get("api/contest/:entry", function(req, res){
//   Contest.findOne({entry: req.params.entry}).then(function(contest){
//     contest.isCurrentUser = (contest._id == req.session.contest_id)
//     res.json(contest);
//   });
// });
//
// app.post("api/contest", function(req, res){
//   Contest.create(req.body.contest).then(function(contest){
//     res.redirect("api/contest/" + contest.entry);
//   });
// });
//
// app.delete("api/contest/:entry/delete", function(req, res){
//   Contest.findOneAndRemove({entry: req.params.entry}).then(function(){
//     res.json({success: true});
//   });
// });
//
// app.post("api/contest/:entry", function(req, res){
//   Contest.findOneAndUpentry({entry: req.params.entry}, req.body.contest, {new: true}).then(function(contest){
//     res.json(contest);
//   });
// });

app.get("/*", function(req, res){
  res.render("beachhouse");
});

app.listen(app.get("port"), function(){
  console.log("Look at me all working and stuff!")
});
