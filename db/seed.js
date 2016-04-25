var mongoose = require("./connection");
var seedData = require("./seeds");

var Mixologist = mongoose.model("Mixologist");

Mixologist.remove({}).then(function(){
  Mixologist.collection.insert(seedData).then(function(){
    process.exit();
  });
});
