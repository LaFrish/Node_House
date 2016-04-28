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
  .factory("Beachhouse", [
    "$resource",
    BeachhouseFactory
  ])
  .factory("Mixologist", [
    "$resource",
    MixologistFactory
  ])
  .factory("Boombox", [
    "$resource",
    BoomboxFactory
  ])
  .factory("Photobooth", [
    "$resource",
    PhotoboothFactory
  ])
  .controller("BHIndexCtrl", [
    "BeachhouseFactory",
    BHIndexCtrlFunction
  ])
  .controller("BHShowCtrl", [
    "BeachhouseFactory",
    "$stateParams",
    BHShowCtrlFunction
  ])
  .controller("MixIndexCtrl", [
    "MixologistFactory",
    MixIndexCtrlFunction
  ])
  .controller("MixShowCtrl", [
    "MixologistFactory",
    "$stateParams",
    MixShowCtrlFunction
  ])
  .controller("BoomIndexCtrl", [
    "BoomboxFactory",
    BoomIndexCtrlFunction
  ])
  .controller("BoomShowCtrl", [
    "BoomboxFactory",
    "$stateParams",
    BoomShowCtrlFunction
  ])
  .controller("PhotoIndexCtrl", [
    "PhotoboothFactory",
    PhotoIndexCtrlFunction
  ])
  .controller("PhotoShowCtrl", [
    "PhotoboothFactory",
    "$stateParams",
    PhotoShowCtrlFunction
  ])
  .controller("ContestIndexCtrl", [
    "ContestFactory",
    ContestIndexCtrlFunction
  ])
  .controller("ContestShowCtrl", [
    "ContestFactory",
    "$stateParams",
    ContestShowCtrlFunction
  ])
  .directive("ContestForm", [
    "ContestFactory",
    "$state",
    ContestFormDirectiveFunction
  ])
  .controller("CalendarIndexCtrl", [
    "CalendarFactory",
    CalendarIndexCtrlFunction
  ])
  .controller("CalendarShowCtrl", [
    "CalendarFactory",
    "$stateParams",
    CalendarShowCtrlFunction
  ]);


  function RouterFunction($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("Beachhouse-welcome",{
      url: "/",
      templateUrl: "assets/html/beachhouse-welcome.html"
    })
    .state("Beachhouse-index",{
      url: "/beachhouse",
      templateUrl: "assets/html/beachhouse-index.html",
      controller: "BHIndexCtrl",
      controllerAs: "BHIndexVM"
    })
    // .state("",{
    //   url: "/",
    //   templateUrl: "assets/html/.html",
    //   controller: "BHShowCtrl",
    //   controllerAs: "BHShowVM"
    // })
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
      url: "/Contest",
      templateUrl: "assets/html/contest-index.html",
      controller: "ContestIndexCtrl",
      controllerAs:"ContestIndexVM"
    })
    .state("ContestShow",{
      url: "/Contest/entry",
      templateUrl: "assets/html/contest-show.html",
      controller: "ContestShowCtrl",
      controllerAs:"ContestShowVM"
    })
    .state("CalendarIndex",{
      url: "/photobooth/:photo_name",
      templateUrl: "assets/html/photobooth-show.html",
      controller: "PhotoShowCtrl",
      controllerAs:"PhotoShowVM"
    })
    .state("CalendarShow",{
      url: "/photobooth/:photo_name",
      templateUrl: "assets/html/photobooth-show.html",
      controller: "PhotoShowCtrl",
      controllerAs:"PhotoShowVM"
    });
    $urlRouterProvider.otherwise("/");
  }
  function BeachhouseFactory($resource){
    var Beachhouse = $resource("/beachhouse",
  {}, {
    update: {method: "PUT"}
  });
  Beachhouse.all = Beachhouse.query();
  return Beachhouse;
  }
  function BHIndexCtrlFunction(Beachhouse){
    var vm = this;
    vm.beachhouses = Beachhouse.all;
  }
  function BHShowCtrlFunction(Beachhouse){
    var vm = this;
    vm.beachhouses = Beachhouse.all;
  };

  function MixologistFactory($resource){
    var Mixologist = $resource("/mixologist/drink_name",
  {}, {
    update: {method: "PUT"}
  });
  Mixologist.all = Mixologist.query();
  return Mixologist;
  }
  function MixIndexCtrlFunction(Mixologist){
    var vm = this;
    vm.mixologists = Mixologist.all;
  }
  function MixShowCtrlFunction(Mixologist){
    var vm = this;
    vm.mixologists = Mixologist.all;
  };

  function BoomboxFactory($resource){
    var Boombox = $resource("/boombox/playlist_name",
  {}, {
    update: {method: "PUT"}
  });
  Boombox.all = Boombox.query();
  return Boombox;
  }
  function BoomIndexCtrlFunction(Boombox){
    var vm = this;
    vm.boomboxes = Boombox.all;
  }
  function BoomShowCtrlFunction(Boombox){
    var vm = this;
    vm.boomboxes = Boombox.all;
  };

  function PhotoboothFactory($resource){
    var Photobooth = $resource("/photobooth/photo_name",
  {}, {
    update: {method: "PUT"}
  });
  Photobooth.all = Photobooth.query();
  return Photobooth;
  }
  function PhotoIndexCtrlFunction(Photobooth){
    var vm = this;
    vm.photobooths = Photobooth.all;
  }
  function PhotoShowCtrlFunction(Photobooth){
    var vm = this;
    vm.photobooths = Photobooth.all;
  };

  function ContestFactory($resource){
    var Contest = $resource("/contest/entry",
  {}, {
    update: {method: "PUT"}
  });
  Contest.all = Contest.query();
  return Contest;
  }
  function ContestIndexCtrlFunction(Contest){
    var vm = this;
    vm.contests = Contest.all;
  }
  function ContestShowCtrlFunction(Contest){
    var vm = this;
    vm.contests = Contest.all;
  };

  function CalendarFactory($resource){
    var Calendar = $resource("/calendar/show",
  {}, {
    update: {method: "PUT"}
  });
  Calendar.all = Calendar.query();
  return Calendar;
  }
  function CalendarIndexCtrlFunction(Calendar){
    var vm = this;
    vm.calendars = Calendar.all;
  }
  function CalendarShowCtrlFunction(Calendar){
    var vm = this;
    vm.calendars = Contest.all;
  };
  function ContestFormDirectiveFunction(ContestFactory, $state){
    return{
      templateUrl: "assets/html/contest-form.html",
      scope: {
        grumble: "="
      },

          });
        }
})();
