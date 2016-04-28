"use strict";

(function(){
  angular
  .module("beachhouse", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    RouterFunction
  ])
  .factory("MixologistFactory", [
    "$resource",
    MixologistFactoryFunction
  ])
  // .factory("Boombox", [
  //   "$resource",
  //   BoomboxFactory
  // ])
  // .factory("Photobooth", [
  //   "$resource",
  //   PhotoboothFactory
  // ])
  // .factory("Contest", [
  //   "$resource",
  //   ContestFactory
  // ])
  .controller("MixIndexCtrl", [
    "MixologistFactory",
    MixIndexCtrlFunction
  ])
  .controller("MixShowCtrl", [
    "MixologistFactory",
    "$stateParams",
    "$window",
    MixShowCtrlFunction
  ]);
  // .controller("BoomIndexCtrl", [
  //   "BoomboxFactory",
  //   BoomIndexCtrlFunction
  // ])
  // .controller("BoomShowCtrl", [
  //   "BoomboxFactory",
  //   "$stateParams",
  //   "$window",
  //   BoomShowCtrlFunction
  // ])
  // .controller("PhotoIndexCtrl", [
  //   "PhotoboothFactory",
  //   PhotoIndexCtrlFunction
  // ])
  // .controller("PhotoShowCtrl", [
  //   "PhotoboothFactory",
  //   "$stateParams",
  //   "$window",
  //   PhotoShowCtrlFunction
  // ])
  // .controller("ContestIndexCtrl", [
  //   "ContestFactory",
  //   ContestIndexCtrlFunction
  // ])
  // .controller("ContestShowCtrl", [
  //   "ContestFactory",
  //   "$stateParams",
  //   "$window",
  //   ContestShowCtrlFunction
  // ]);
  // .directive("ContestForm", [
  //   "ContestFactory",
  //   "$state",
  //   ContestFormDirectiveFunction
  // ])
  // .controller("CalendarIndexCtrl", [
  //   "CalendarFactory",
  //   CalendarIndexCtrlFunction
  // ])
  // .controller("CalendarShowCtrl", [
  //   "CalendarFactory",
  //   "$stateParams",
  //   "$window",
  //   CalendarShowCtrlFunction
  // ]);


  function RouterFunction($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("Home",{
      url: "/",
      templateUrl: "assets/html/home.html",
    })
    .state("MixIndex", {
      url: "/mixologist",
      templateUrl: "assets/html/mixologist-index.html",
      controller: "MixIndexCtrl",
      controllerAs: "MixIndexVM"
    })
    .state("MixShow",{
      url: "/mixologist/:drink_name",
      templateUrl: "assets/html/mixologist-show.html",
      controller: "MixShowCtrl",
      controllerAs: "MixShowVM"
    })
    .state("BoomIndex",{
      url: "/boombox",
      templateUrl: "assets/html/boombox-index.html",
      controller: "BoomIndexCtrl",
      controllerAs:"BoomIndexVM"
    })
    .state("BoomShow",{
      url: "/boombox/:playlist_name",
      templateUrl: "assets/html/boombox-show.html",
      controller: "BoomShowCtrl",
      controllerAs:"BoomShowVM"
    })
    .state("PhotoIndex",{
      url: "/photobooth",
      templateUrl: "assets/html/photobooth-index.html",
      controller: "PhotoIndexCtrl",
      controllerAs:"PhotoIndexVM"
    })
    .state("PhotoShow",{
      url: "/photobooth/:photo_name",
      templateUrl: "assets/html/photobooth-show.html",
      controller: "PhotoShowCtrl",
      controllerAs:"PhotoShowVM"
    })
    .state("ContestIndex",{
      url: "/contest",
      templateUrl: "assets/html/contest-index.html",
      controller: "ContestIndexCtrl",
      controllerAs:"ContestIndexVM"
    })
    .state("ContestShow",{
      url: "/contest/:entry",
      templateUrl: "assets/html/contest-show.html",
      controller: "ContestShowCtrl",
      controllerAs:"ContestShowVM"
    });
    // .state("CalendarIndex",{
    //   url: "/photobooth/:photo_name",
    //   templateUrl: "assets/html/photobooth-show.html",
    //   controller: "PhotoShowCtrl",
    //   controllerAs:"PhotoShowVM"
    // })
    // .state("CalendarShow",{
    //   url: "/photobooth/:photo_name",
    //   templateUrl: "assets/html/photobooth-show.html",
    //   controller: "PhotoShowCtrl",
    //   controllerAs:"PhotoShowVM"
    // });
    $urlRouterProvider.otherwise("/");
  }

  function MixologistFactoryFunction($resource){
    var Mixologist = $resource("/api/mixologist/:drink_name",
    {}, {
      update: {method: "PUT"},
      like: {
        method: "POST",
        url:"/api/mixologist/:drink_name/like",
        params: {
          name: "@name"
        }
      }
    });
    Mixologist.all = Mixologist.query();
    console.log(Mixologist.all);
    // Mixologist.find = function(property, value, callback){
    //   Mixologist.$promise.then(function(){
    //     Mixologist.forEach(function(mixologist){
    //       if(mixologist[property]== value) callback(mixologist);
    //     });
    //   });
    // }
    return Mixologist;
  }
  function MixIndexCtrlFunction(Mixologist){
    var vm = this;
    vm.mixologists = Mixologist.all;
    console.log(vm.mixologists);
    // vm.mixologist = Mixologist.query();
  }
  function MixShowCtrlFunction(Mixologist, $stateParams,  $window){
    var vm = this;
    Mixologist.find("drink_name", $stateParams.drink_name, function(mixologist){
      vm.mixologist = mixologist;
    });
    vm.update = function(){
      Mixologist.update({drink_name: vm.mixologist.drink_name}, {mixologist: vm.mixologist}, function(){
        console.log("Dizun!");
      });
    }
    vm.delete = function(){
      Mixologist.remove({ name: vm.mixologist.drink_name}, function(){
      $window.location.replace("/");
      });
    }
    vm.addDrink = function(){
      if(vm.mixologist.drinks.includes(vm.newDrink)){
        console.log("This is a duplicate");
      }else{
        vm.mixologist.drinks.push(vm.newDrink);
        vm.newDrink = "";
        vm.update();
      }
    }
    vm.removeDrink = function($index){
      vm.mixologist.drinks.splice($index, 1);
      vm.update();
    }
    vm.like = function(){
      Mixologist.like(vm.mixologist, function(response){
        vm.mixologist.likedBy = response.likedBy;
      });
    }
  }
  //
  // function BoomboxFactory($resource){
  //   var Boombox = $resource("/api/boombox/:playlist_name",
  //   {}, {
  //     update: {method: "PUT"},
  //     like: {
  //       method: "POST",
  //       url:"/api/boombox/:playlist_name/like",
  //       params: {
  //         name: "@name"
  //       }
  //     }
  //   });
  //   Boombox.all = Boombox.query();
  //   Boombox.find = function(property, value, callback){
  //     Boombox.$promise.then(function(){
  //       Boombox.forEach(function(boombox){
  //         if(boombox[property]== value) callback(boombox);
  //       });
  //     });
  //   }
  //   return Boombox;
  // }
  // function BoomIndexCtrlFunction(Boombox){
  //   var vm = this;
  //   vm.boomboxes = Boombox.all;
  // }
  // function BoomShowCtrlFunction(Boombox, $stateParams,  $window){
  //   var vm = this;
  //   Boombox.find("playlist_name", $stateParams.playlist_name, function(boombox){
  //     vm.boombox = boombox;
  //   });
  //   vm.update = function(){
  //     Boombox.update({name: vm.boombox.playlist_name}, {boombox: vm.boombox}, function(){
  //       console.log("Dizun!");
  //     });
  //   }
  //   vm.delete = function(){
  //     Boombox.remove({ name: vm.boombox.playlist_name}, function(){
  //     $window.location.replace("/");
  //     });
  //   }
  //   vm.addMusic = function(){
  //     if(vm.boombox.musics.includes(vm.newMusic)){
  //       console.log("This is a duplicate");
  //     }else{
  //       vm.boombox.musics.push(vm.newMusic);
  //       vm.newMusic = "";
  //       vm.update();
  //     }
  //   }
  //   vm.removeMusic = function($index){
  //     vm.boombox.musics.splice($index, 1);
  //     vm.update();
  //   }
  //   vm.like = function(){
  //     Boombox.like(vm.boombox, function(response){
  //       vm.boombox.likedBy = response.likedBy;
  //     });
  //   }
  // }
  //
  // function PhotoboothFactory($resource){
  //   var Photobooth = $resource("/api/photobooth/:photo_name",
  //   {}, {
  //     update: {method: "PUT"},
  //     like: {
  //       method: "POST",
  //       url:"/api/photobooth/:photo_name/like",
  //       params: {
  //         name: "@name"
  //       }
  //     }
  //   });
  //   Photobooth.all = Photobooth.query();
  //   Photobooth.find = function(property, value, callback){
  //     Photobooth.$promise.then(function(){
  //       Photobooth.forEach(function(photobooth){
  //         if(photobooth[property]== value) callback(photobooth);
  //       });
  //     });
  //   }
  //   return Photobooth;
  // }
  // function PhotoIndexCtrlFunction(Photobooth){
  //   var vm = this;
  //   vm.photobooths = Photobooth.all;
  // }
  // function PhotoShowCtrlFunction(Photobooth, $stateParams,  $window){
  //   var vm = this;
  //   Photobooth.find("photo_name", $stateParams.photo_name, function(photobooth){
  //     vm.photobooth = photobooth;
  //   });
  //   vm.update = function(){
  //     Photobooth.update({name: vm.photobooth.photo_name}, {photobooth: vm.photobooth}, function(){
  //       console.log("Dizun!");
  //     });
  //   }
  //   vm.delete = function(){
  //     Photobooth.remove({ name: vm.photobooth.photo_name}, function(){
  //     $window.location.replace("/");
  //     });
  //   }
  //   vm.addPhoto = function(){
  //     if(vm.photobooth.musics.includes(vm.newPhoto)){
  //       console.log("This is a duplicate");
  //     }else{
  //       vm.photobooth.musics.push(vm.newPhoto);
  //       vm.newPhoto = "";
  //       vm.update();
  //     }
  //   }
  //   vm.removePhoto = function($index){
  //     vm.photobooth.musics.splice($index, 1);
  //     vm.update();
  //   }
  //   vm.like = function(){
  //     Photobooth.like(vm.photobooth, function(response){
  //       vm.photobooth.likedBy = response.likedBy;
  //     });
  //   }
  // }
  //
  // function ContestFactory($resource){
  //   var Contest = $resource("/api/contest/:entry",
  //   {}, {
  //     update: {method: "PUT"},
  //     like: {
  //       method: "POST",
  //       url:"/api/contest/:entry/like",
  //       params: {
  //         name: "@name"
  //       }
  //     }
  //   });
  //   Contest.all = Contest.query();
  //   Contest.find = function(property, value, callback){
  //     Contest.$promise.then(function(){
  //       Contest.forEach(function(contest){
  //         if(contest[property]== value) callback(contest);
  //       });
  //     });
  //   }
  //   return Contest;
  // }
  // function ContestIndexCtrlFunction(Contest){
  //   var vm = this;
  //   vm.contests = Contest.all;
  // }
  // function ContestShowCtrlFunction(Contest, $stateParams,  $window){
  //   var vm = this;
  //   Contest.find("entry", $stateParams.entry, function(contest){
  //     vm.contest = contest;
  //   });
  //   vm.update = function(){
  //     Contest.update({name: vm.contest.entry}, {contest: vm.contest}, function(){
  //       console.log("Dizun!");
  //     });
  //   }
  //   vm.delete = function(){
  //     Contest.remove({ name: vm.contest.entry}, function(){
  //     $window.location.replace("/");
  //     });
  //   }
  //   vm.addEntry = function(){
  //     if(vm.contest.entries.includes(vm.newEntry)){
  //       console.log("This is a duplicate");
  //     }else{
  //       vm.contest.entries.push(vm.newEntry);
  //       vm.newEntry = "";
  //       vm.update();
  //     }
  //   }
  //   vm.removeEntry = function($index){
  //     vm.contest.entries.splice($index, 1);
  //     vm.update();
  //   }
  //   vm.like = function(){
  //     Contest.like(vm.contest, function(response){
  //       vm.contest.likedBy = response.likedBy;
  //     });
  //   }
  // }
})();
  // function CalendarFactory($resource){
  //   var Calendar = $resource("/calendar/show",
  //   {}, {
  //     update: {method: "PUT"}
  //   });
  //   Calendar.all = Calendar.query();
  //   return Calendar;
  // }
  // function CalendarIndexCtrlFunction(Calendar){
  //   var vm = this;
  //   vm.calendars = Calendar.all;
  // }
  // function CalendarShowCtrlFunction(Calendar){
  //   var vm = this;
  //   vm.calendars = Contest.all;
  // };
  // function ContestFormDirectiveFunction(ContestFactory, $state){
  //   return{
  //     templateUrl: "assets/html/contest-form.html",
  //     scope: {
  //       grumble: "="
  //     }
  //   };
