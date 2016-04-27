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
    BHIndexCtrl
  ])
  .controller("BHShowCtrl", [
    "BeachhouseFactory",
    "$stateParams",
    BHShowCtrl
  ])
  .controller("MixIndexCtrl", [
    "MixologistFactory",
    MixIndexCtrl
  ])
  .controller("MixShowCtrl", [
    "MixologistFactory",
    "$stateParams",
    MixShowCtrl
  ])
  .controller("BoomIndexCtrl", [
    "BoomboxFactory",
    BoomIndexCtrl
  ])
  .controller("BoomShowCtrl", [
    "BoomboxFactory",
    "$stateParams",
    BoomShowCtrl
  ])
  .controller("PhotoIndexCtrl", [
    "PhotoboothFactory",
    PhotoIndexCtrl
  ])
  .controller("PhotoShowCtrl", [
    "PhotoboothFactory",
    "$stateParams",
    PhotoShowCtrl
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
    });
    $urlRouterProvider.otherwise("/");
  }
  function BeachhouseFactory($resource){
    var Beachhouse = $resource("/beachhouse/",
  {}, {
    update: {method: "PUT"}
  });
  Beachhouse.all = Beachhouse.query();
  return Beachhouse;
  }
  function BHIndexCtrl(Beachhouse){
    var vm = this;
    vm.beachhouses = Beachhouse.all;
  }
  function BHShowCtrl(Beachhouse){
    var vm = this;
    vm.beachhouses = Beachhouse.all;
  };

  function MixologistFactory($resource){
    var Mixologist = $resource("/mixologist",
  {}, {
    update: {method: "PUT"}
  });
  Mixologist.all = Mixologist.query();
  return Mixologist;
  }
  function MixIndexCtrl(Mixologist){
    var vm = this;
    vm.mixologists = Mixologist.all;
  }
  function MixShowCtrl(Mixologist){
    var vm = this;
    vm.mixologists = Mixologist.all;
  };

  function BoomboxFactory($resource){
    var Boombox = $resource("/boombox",
  {}, {
    update: {method: "PUT"}
  });
  Boombox.all = Boombox.query();
  return Boombox;
  }
  function BHIndexCtrl(Boombox){
    var vm = this;
    vm.boomboxes = Boombox.all;
  }
  function BHIndexCtrl(Boombox){
    var vm = this;
    vm.boomboxes = Boombox.all;
  };

  function PhotoboothFactory($resource){
    var Photobooth = $resource("/photobooth/:photo_name",
  {}, {
    update: {method: "PUT"}
  });
  Photobooth.all = Photobooth.query();
  return Photobooth;
  }
  function BHIndexCtrl(Photobooth){
    var vm = this;
    vm.photobooths = Photobooth.all;
  }
  function BHShowCtrl(Photobooth){
    var vm = this;
    vm.photobooths = Photobooth.all;
  };
})();
