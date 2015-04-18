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

    rasp.isLoading = true;
    rasp.isLogin = false;
    rasp.isLista = false;
    rasp.isButton = false;
    rasp.isRegUser = false;
    rasp.isRegRasp = false;

    rasp.toLogin = function(){
      rasp.isLoading = false;
      rasp.isButton = false;
      rasp.isRegRasp = false;
      rasp.isRegUser = false;
      rasp.isLista = false;
      rasp.isLogin = true;
      console.log("entro en login");
    };

    rasp.toLista = function(){
      rasp.isButton = false;
      rasp.isRegRasp = false;
      rasp.isRegUser = false;
      rasp.isLogin = false;
      rasp.isLista = true;
    };

    rasp.toButtons = function(){
      rasp.isRegRasp = false;
      rasp.isLista = false;
      rasp.isRegUser = false;
      rasp.isLogin = false;
      rasp.isButton = true;
    };
    
    rasp.toRegUser = function(){
      rasp.isButton = false;
      rasp.isLista = false;
      rasp.isLogin = false;
      rasp.isRegRasp = false;
      rasp.isRegUser = true;
    };
    
    rasp.toRegRasp = function(){
      rasp.isButton = false;
      rasp.isLista = false;
      rasp.isLogin = false;
      rasp.isRegUser = false;
      rasp.isRegRasp = true;
    };

    rasp.back = function (){
      if (rasp.isLista)
        rasp.toLogin();
      else if (rasp.isRegUser)
        rasp.toLogin();
      else if (rasp.isButton)
        rasp.toLista();
      else if (rasp.isRegRasp)
        rasp.toLista();
    }

    rasp.reles = [];

    //rasp.urlBase = "http://0.0.0.0:20062/";
    rasp.urlBase = "http://pasarela.lab.inf.uva.es:20062/";

    rasp.setValue = function (rele) {
      if (rele.state) 
        rele.state = false;
      else 
        rele.state = true;
      //rasp.debug = JSON.stringify(rele);
      console.log("rele set = " + JSON.stringify(rele));
      $http.post(rasp.urlBase + 'setValue/', rele)
      .success(function(data){
        console.log("id = " + JSON.stringify(data));
        rasp.parse(data);
      }).error(function(data){
        console.log("set fallo");
      });
    };

    rasp.getValue = function () {
      $http.get(rasp.urlBase + 'getValue/')
      .success(function(data){
        rasp.parse(data);
        //setTimeout(rasp.toLogin, 1000);
        rasp.toLogin();
        console.log("id = " + JSON.stringify(data));
      }).error(function(data){
        console.log("set fallo");
      }).finally(function() {
      });
    };

    rasp.parse = function (data){
      rasp.reles = [{
        name : "ventilador",
        id : 1,
        state : !data.out1
      },{
        name : "alarma",
        id : 3,
        state : !data.out3
      },{
        name : "lampara",
        id : 2,
        state : !data.out2
      },{
        name : "otro2",
        id : 4,
        state : !data.out4
      }];
    };

    rasp.debug = "";

    rasp.getValue();

}]).config(function($ionicConfigProvider) {
   $ionicConfigProvider.navBar.alignTitle("center");
});

