var express = require("express");
var hbs = require("express-handlebars");
var db = require("./db/connection");

var app = express();

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

app.use("/assets", express.static("public"));

app.get("/", function(req, res){
  res.render("welcome");
});

app.get("/mixologist", function(req, res){
  res.render("mixologist-index", {
    mixologists: db.mixologists
  });
});

app.get("/mixologist/:drink_name", function(req, res){
  var desiredName = req.params.drink_name;
    var mixologistOutput;
    db.mixologists.forEach(function(mixologist){
      if(desiredName === mixologist.drink_name){
        mixologistOutput = mixologist;
      }
    });
  res.render("mixologist-show", {
    mixologist: mixologistOutput
  });
});

app.listen(app.get("port"), function(){
  console.log("Look at me all working and stuff!")
});
