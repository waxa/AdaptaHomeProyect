// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('RaspController', ['$http', function($http){
    var rasp = this;

    rasp.datos = {
      id: 1,
      state : false
    };

    rasp.setValue = function (cosa) {
      console.log("id = " + JSON.stringify(rasp.datos));
      $http.post('http://pasarela.lab.inf.uva.es:8080/setValue/', rasp.datos)
      .success(function(data){
        console.log("id = " + JSON.stringify(data));
        //rasp.datos = data[0];
      }).error(function(data){
        console.log("fallo");
      });
    };

    // rasp.imprime = function () {
    //   if (rasp.datos.state)
    //     console.log("imprime true");
    //   else
    //     console.log("imprime false");
    // };

    rasp.getValue = function () {
      $http.get('http://pasarela.lab.inf.uva.es:8080/getValue/')
      .success(function(data){

        rasp.datos.state = data.out1;
        console.log("id = " + JSON.stringify(data));
      }).error(function(data){
        console.log("fallo");
      });
    };

    rasp.getValue();

}]).config(function($ionicConfigProvider) {
   $ionicConfigProvider.navBar.alignTitle("center");
});

