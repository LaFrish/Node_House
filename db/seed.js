var mongoose = require("./connection");
var seedData = require("./seeds");

var Mixologist = mongoose.model("Mixologist");
var Boombox = mongoose.model("Boombox");
var Photobooth = mongoose.model("Photobooth");

Mixologist.remove({}).then(function(){
  Mixologist.collection.insert(seedData).then(function(){
    process.exit();
  });
});

Boombox.remove({}).then(function(){
  Boombox.collection.insert(seedData).then(function(){
    process.exit();
  });
});

Photobooth.remove({}).then(function(){
  Photobooth.collection.insert(seedData).then(function(){
    process.exit();
  });
});
