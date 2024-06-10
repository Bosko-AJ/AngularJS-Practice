var myNinjaApp = angular.module("myNinjaApp", [
  "ngRoute",
  "ui.router",
  "ngAnimate",
])
//before app runs
myNinjaApp.config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false,
    });
    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "NinjaController",
      })
      .when("/contact", {
        templateUrl: "views/contact.html",
        controller: "ContactController",
      })
      .when("/contact-success", {
        templateUrl: "views/contact-success.html",
        controller: "ContactController",
      })
      .when("/directory", {
        templateUrl: "views/directory.html",
        controller: "NinjaController",
      })
      .otherwise({
        redirectTo: "/home",
      });
    $locationProvider.html5Mode(true);
  },
]);
myNinjaApp.directive("randomNinja", [
  function () {
    return {
      restrict: "E",
      $scope: {
        ninjas: "=",
        title: "=",
      },
      templateUrl: "views/random.html",
      transclude: true, //display nested html tag from home to random
      replace: true, //for standard-complain; not to show random-ninja in console
      controller: function ($scope) {
        $scope.random = Math.floor(Math.random() * 4);
      },
    };
  },
]);
//after app runs
myNinjaApp.run(function () {});
//Controlls our application data
myNinjaApp.controller("NinjaController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    //Scope is binding part between HTML view and JS controller
    $scope.title = "Random Ninja";
    $scope.removeNinja = function (ninja) {
      var removedNinja = $scope.ninjas.indexOf(ninja);
      $scope.ninjas.splice(removedNinja, 1);
    };
    $scope.message = "hey y'all";
    $scope.addNinja = function () {
      $scope.ninjas.push({
        name: $scope.newninja.name,
        belt: $scope.newninja.belt,
        rate: parseInt($scope.newninja.rate),
        available: true,
      });
      $scope.newninja.name = "";
      $scope.newninja.belt = "";
      $scope.newninja.rate = "";
    };
    $scope.removeAll = function () {
      $scope.ninjas = "";
    };
    //console.log(angular.toJson($scope.ninjas));
    $http({
      method: "GET",
      url: "data/ninjas.json",
    }).then(
      function (response) {
        $scope.ninjas = response.data;
      },
      function (error) {
        console.log(error);
      }
    );
  },
]);
myNinjaApp.controller("ContactController", [
  "$scope",
  "$location",
  function ($scope, $location) {
    $scope.sendMessage = function () {
      $location.path("/contact-success");
    };
  },
]);
myNinjaApp.controller("HeaderController", [
  "$scope",
  function ($scope) {
    // Initialize a variable to control the visibility of the div
    $scope.isNavOpen = false;

    $scope.navBarToggle = function () {
      // Toggle the value of isNavOpen
      $scope.isNavOpen = !$scope.isNavOpen;
    };
  },
]);
