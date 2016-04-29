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
  .factory("Mixologist", [
    "$resource",
    MixologistFactory
  ])
  // .factory("Boombox", [
  //   "$resource",
  //   BoomboxFactory
  // ])
  .factory("Photobooth", [
    "$resource",
    PhotoboothFactory
  ])
  .factory("Contest", [
    "$resource",
    ContestFactory
  ])
  .controller("MixIndexCtrl", [
    "Mixologist",
    MixIndexCtrlFunction
  ])
  .controller("MixShowCtrl", [
    "Mixologist",
    "$stateParams",
    // "$window",
    MixShowCtrlFunction
  ])
  // .controller("BoomIndexController", [
  //   "Boombox",
  //   BoomIndexCtrl
  // ])
  // .controller("BoomShowController", [
  //   "Boombox",
  //   "$stateParams",
  //   BoomShowCtrl
  // ])
  .controller("PhotoIndexController", [
    "Photobooth",
    PhotoIndexCtrl
  ])
  .controller("PhotoShowController", [
    "Photobooth",
    "$stateParams",
    "$state",
    PhotoShowCtrl
  ])
  .controller("ContestIndexController", [
    "Contest",
    ContestIndexCtrl
  ])
  .controller("ContestShowController", [
    "Contest",
    "$stateParams",
    ContestShowCtrl
  ])
  // .directive("ContestForm", [
  //   "Contest",
  //   "$state",
  //   ContestFormDirectiveFunction
  // ])
  .controller("CalendarIndexController", [
    "Calendar",
    CalendarIndexCtrl
  ])
  .controller("CalendarShowController", [
    "Calendar",
    "$stateParams",
    "$state",
    CalendarShowCtrl
  ]);


  // RouterFunction.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
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
    // .state("BoomIndex",{
    //   url: "/boombox",
    //   templateUrl: "assets/html/boombox-index.html",
    //   controller: "BoomIndexCtrl",
    //   controllerAs:"BoomIndexVM"
    // })
    // .state("BoomShow",{
    //   url: "/boombox/:playlist_name",
    //   templateUrl: "assets/html/boombox-show.html",
    //   controller: "BoomShowCtrl",
    //   controllerAs:"BoomShowVM"
    // })
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
    })
    .state("CalendarIndex",{
      url: "/calendar/",
      templateUrl: "assets/html/calendar-index.html",
      controller: "CalIndexCtrl",
      controllerAs:"CalIndexVM"
    })
    .state("CalendarShow",{
      url: "/calendar/:show",
      templateUrl: "assets/html/calendar-show.html",
      controller: "CalShowCtrl",
      controllerAs:"CalShowVM"
    });
    $urlRouterProvider.otherwise("/");
  }


    // MixologistFactory.$inject = ["$resource"];
    function MixologistFactory($resource){
      var Mixologist = $resource("/api/mixologist/:drink_name", {}, {
        update: {method: "PATCH"}
      });
      return Mixologist;
    }

    // MixIndexCtrlFunction.$inject = ["Mixologist"];
    function MixIndexCtrlFunction(Mixologist){
      var vm = this;
      vm.mixologists = Mixologist.query();
      vm.create = function(){
        Mixologist.save(vm.newMixologist, function(response){
          vm.mixologists.push(response);
        });
      }
    }

    // MixShowCtrlFunction.$inject = ["Mixologist"];
    function MixShowCtrlFunction($stateParams, Mixologist, $state){
console.log(Mixologist);
      var vm        = this;
      vm.mixologist = Mixologist.get($stateParams);
      vm.delete     = function(){
        Mixologist.remove($stateParams, function(){
          $state.go("MixIndex");
        });
      }
      vm.update = function(){
        Mixologist.update($stateParams, vm.mixologist, function(response){
          $state.go("MixShow", response);
        });
      }
    }

// ------------------------------------
  // function MixologistFactory($resource){
  //   var Mixologist = $resource("/api/mixologist/:drink_name",
  //   {}, {
  //     update: {method: "PUT"},
  //     like: {
  //       method: "POST",
  //       url:"/api/mixologist/:drink_name/like",
  //       params: {
  //         name: "@name"
  //       }
  //     }
  //   });
  //   Mixologist.all = Mixologist.query();
  //   console.log(Mixologist.all);
  //   Mixologist.find = function(property, value, callback){
  //   Mixologist.all.$promise.then(function(){
  //       Mixologist.all.forEach(function(mixologist){
  //         if(mixologist[property] == value) callback(mixologist);
  //       });
  //     });
  //   }
  //   return Mixologist;
  // }
  // function Function(Mixologist){
  //   var vm = this;
  //   vm.mixologists = Mixologist.all;
  //   console.log(vm.mixologists);
  //   // vm.mixologist = Mixologist.query();
  // }
  // function MixShowCtrlFunction(Mixologist, $stateParams,  $state){
  //   var vm = this;
  //   Mixologist.find("drink_name", $stateParams.drink_name, function(mixologist){
  //     vm.mixologist = mixologist;
  //     console.log(vm.mixologist);
  //   });
  //   vm.update = function(){
  //     Mixologist.update({drink_name: vm.mixologist.drink_name}, {mixologist: vm.mixologist}, function(){
  //       console.log("Dizun!");
  //     });
  //   }
  //   vm.delete = function(){
  //     Mixologist.remove({ name: vm.mixologist.drink_name}, function(){
  //     $state.location.replace("/");
  //     });
  //   }
  //   vm.addDrink = function(){
  //     if(vm.mixologist.drinks.includes(vm.newDrink)){
  //       console.log("This is a duplicate");
  //     }else{
  //       vm.mixologist.drinks.push(vm.newDrink);
  //       vm.newDrink = "";
  //       vm.update();
  //     }
  //   }
  //   vm.removeDrink = function($index){
  //     vm.mixologist.drinks.splice($index, 1);
  //     vm.update();
  //   }
  //   vm.like = function(){
  //     Mixologist.like(vm.mixologist, function(response){
  //       vm.mixologist.likedBy = response.likedBy;
  //     });
  //   }
  // }
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
  // function BoomShowCtrlFunction(Boombox, $stateParams,  $state){
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
  //     $state.location.replace("/");
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

  PhotoboothFactory.$inject = ["$resource"];
 function PhotoboothFactory($resource){
   var Photobooth = $resource("/api/photobooth/:entry", {}, {
     update: {method: "PATCH"}
   });
   return Photobooth;
 }

PhotoIndexCtrl.$inject = ["Photobooth"];
 function PhotoIndexCtrl(Photobooth){
   var vm      = this;
   vm.photobooths = Photobooth.query();
   vm.create   = function(){
     Photobooth.save(vm.newPhotobooth, function(response){
       vm.photobooths.push(response);
     });
   }
 }

 PhotoShowCtrl.$inject =  ["$stateParams", "Photobooth", "$state"]
 function PhotoShowCtrl($stateParams, Photobooth, $state){
   var vm      = this;
   vm.photobooth  = Photobooth.get($stateParams);
   vm.delete   = function(){
     Photobooth.remove($stateParams, function(){
       $state.go("PhotoIndex");
     });
   }
   vm.update = function(){
     Photobooth.update($stateParams, vm.photobooth, function(response){
       $state.go("PhotoShow", response);
     });
   }
 }

   ContestFactory.$inject = ["$resource"];
  function ContestFactory($resource){
    var Contest = $resource("/api/contest/:entry", {}, {
      update: {method: "PATCH"}
    });
    return Contest;
  }

  ContestIndexCtrl.$inject = ["Contest"];
  function ContestIndexCtrl(Contest){
    var vm      = this;
    vm.contests = Contest.query();
    vm.create   = function(){
      Contest.save(vm.newContest, function(response){
        vm.contests.push(response);
      });
    }
  }

  ContestShowCtrl.$inject =  ["$stateParams", "Contest", "$state"]
  function ContestShowCtrl($stateParams, Contest, $state){
    var vm      = this;
    vm.contest  = Contest.get($stateParams);
    vm.delete   = function(){
      Contest.remove($stateParams, function(){
        $state.go("ContestIndex");
      });
    }
    vm.update = function(){
      Contest.update($stateParams, vm.contest, function(response){
        $state.go("ContestShow", response);
      });
    }
  }

  function CalendarFactory($resource){
    var Calendar = $resource("/calendar/show",
    {}, {
      update: {method: "PUT"}
    });
    Calendar.all = Calendar.query();
    return Calendar;
  }
  function CalendarIndexCtrl(Calendar){
    var vm = this;
    vm.calendars = Calendar.all;
    vm.create   = function(){
      Calendar.save(vm.newCalendar, function(response){
        vm.calendars.push(response);
      });
    }
  }
  function CalendarShowCtrl(Calendar){
    var vm = this;
    vm.calendars = Calendar.all;
  };
  })();
