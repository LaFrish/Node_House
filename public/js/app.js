"use strict";

(function(){
  angular
  .module("Node_House", [
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
    "$state",
    MixShowCtrlFunction
  ])
  .controller("PhotoIndexController", [
    "Photobooth",
    PhotoIndexCtrlFunction
  ])
  .controller("PhotoShowController", [
    "Photobooth",
    "$stateParams",
    "$state",
    PhotoShowCtrlFunction
  ])
  .controller("ContestIndexController", [
    "Contest",
    ContestIndexCtrlFunction
  ])
  .controller("ContestShowController", [
    "Contest",
    "$stateParams",
    "$state",
    ContestShowCtrlFunction
  ]);


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
    $urlRouterProvider.otherwise("/");
  }

    function MixologistFactory($resource){
      var Mixologist = $resource("/api/mixologist/:drink_name", {}, {
        update: {method: "PATCH"}
      });
      return Mixologist;
    }

    function MixIndexCtrlFunction(Mixologist){
      var vm = this;
      vm.mixologists = Mixologist.query();
      vm.create = function(){
        Mixologist.save(vm.newMixologist, function(response){
          vm.mixologists.push(response);
        });
      }
    }

    function MixShowCtrlFunction(Mixologist, $stateParams, $state){
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

 function PhotoboothFactory($resource){
   var Photobooth = $resource("/api/photobooth/:entry", {}, {
     update: {method: "PATCH"}
   });
   return Photobooth;
 }

 function PhotoIndexCtrlFunction(Photobooth){
   var vm      = this;
   vm.photobooths = Photobooth.query();
   vm.create   = function(){
     Photobooth.save(vm.newPhotobooth, function(response){
       vm.photobooths.push(response);
     });
   }
 }

 function PhotoShowCtrlFunction(Photobooth, $stateParams, $state){
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

  function ContestFactory($resource){
    var Contest = $resource("/api/contest/:entry", {}, {
      update: {method: "PATCH"}
    });
    return Contest;
  }

  function ContestIndexCtrlFunction(Contest){
    var vm      = this;
    vm.contests = Contest.query();
    vm.create   = function(){
      Contest.save(vm.newContest, function(response){
        vm.contests.push(response);
      });
    }
  }

  function ContestShowCtrlFunction(Contest, $stateParams, $state){
    console.log(Contest);
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
  };
})();
