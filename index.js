var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var mongoose= require("./db/connection");

var app     = express();

var Mixologist = mongoose.model("Mixologist");

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

app.get("/", function(req, res){
  res.render("welcome");
});

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

app.post("/mixologist:drink_name", function(req, res){
  Mixologist.findOneAndUpdate({drink_name: req.params.drink_name}, req.body.mixologist, {new: true}).then(function(mixologist){
    res.redirect("/mixologist/" + mixologist.drink_name);
  });
});

app.listen(app.get("port"), function(){
  console.log("Look at me all working and stuff!")
});
