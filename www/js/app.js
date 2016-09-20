// Ionic Starter App  
 
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault(); 
    }
  }); 
}) 

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller : 'login'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller : 'daftar'
    })
    .state('beranda', {
      url: '/beranda',
      templateUrl: 'templates/beranda.html',
      controller: 'beranda'
    })
    .state('order', {
      url: '/order',
      templateUrl: 'templates/order.html',
      controller: 'order'
    })
    .state('status', {
      url: '/status',
      templateUrl: 'templates/status.html',
      controller: 'status' 
    }) 
    .state('info', {
      url: '/info',
      templateUrl: 'templates/info.html',
    }) 
    
 

    //state  kurir template
    .state('kberanda', {
    url: '/kberanda',
    templateUrl: 'templates/kurir/kberanda.html',
    controller: 'beranda'
    })

    .state('orderan', {
    url: '/orderan',
    templateUrl: 'templates/kurir/orderan.html',
    controller: 'orderan'
    })

    .state('harga', {
    url: '/harga',
    templateUrl: 'templates/kurir/harga.html'
    })
  
    .state('orderanId', {
    url: '/orderanId/:idOrder',
    templateUrl: 'templates/kurir/orderanId.html',
    controller: 'orderanId'
    })

    .state('map', {
    url: '/map',
    templateUrl: 'templates/kurir/map.html',
    controller: 'MapCtrl'
    }) 

    .state('goto', {
    url: '/goto',
    templateUrl: 'templates/kurir/goto.html',
    controller: 'goto'
    })
    
    .state('carirute', {
    url: '/carirute',
    templateUrl: 'templates/kurir/carirute.html',
    controller: 'cariRute'
    })

    .state('rute', {
    url: '/rute/:idRute',
    templateUrl: 'templates/kurir/rute.html',
    controller: 'rute'
    })

    .state('kinfo', {
    url: '/kinfo',
    templateUrl: 'templates/kurir/kinfo.html',
    })


 $urlRouterProvider.otherwise('/home');

});