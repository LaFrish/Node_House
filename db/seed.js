var mongoose = require("./connection");
// var mixData = require("./mixes");
// var photoData = require("./photos");
// var musicData = require("./musics");
var seedData = require("./contests");
// var calendarData = require("./calendars")

// var Mixologist = mongoose.model("Mixologist");
// var Photobooth = mongoose.model("Photobooth");
var Contest = mongoose.model("Contest");

// Mixologist.remove({}).then(function(){
//   Mixologist.collection.insert(mixData).then(function(datum){
//     console.log(datum);
//     process.exit();
//   });
// });

// Photobooth.remove({}).then(function(){
//   Photobooth.collection.insert(photoData).then(function(){
//     process.exit();
//   });
// });


Contest.remove({}).then(function(){
  Contest.collection.insert(seedData).then(function(){
    process.exit();
  });
});
