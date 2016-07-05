'use strict';

// Declare app level module which depends on views, and components
angular.module('howdy', [
  'ngRoute' ,
  'ui.bootstrap',
  'mobile-angular-ui'
]).
config(['$locationProvider', '$routeProvider',function($locationProvider, $routeProvider) {
  //$locationProvider.hashPrefix('!');
  $routeProvider.
  when('/messages', {
    templateUrl: 'views/message-list.html'
  }).
  when('/message-detail', {
    templateUrl: 'views/message-detail.html'
  })
  .otherwise({redirectTo: '/messages'});
}]);
