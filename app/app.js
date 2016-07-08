'use strict';

// Declare app level module which depends on views, and components
angular.module('howdy', [
  'ngRoute' ,
  'ui.bootstrap',
  'mobile-angular-ui',
  "dbaq.emoji",
  "ngSanitize"

]).
config(['$locationProvider', '$routeProvider', 'emoticonsProvider', function($locationProvider, $routeProvider, emoticonsProvider) {
  //$locationProvider.hashPrefix('!');
  $routeProvider.
  when('/messages', {
    templateUrl: 'views/message-list.html'
  }).
  when('/message-detail', {
    templateUrl: 'views/message-detail.html'
  })
  .otherwise({redirectTo: '/messages'});

  emoticonsProvider.addAlias( ":)", ":smile:" );
  emoticonsProvider.addAlias( ":D", ":smiley:" );
  emoticonsProvider.addAlias( ":((", "rage" );
  emoticonsProvider.addAlias( ":(", "frowning" );
  emoticonsProvider.addAlias( ":'(", "cry" );
  emoticonsProvider.addAlias( ":*", "kissing" );
  // Override the token collection with our more robust offering.
  emoticonsProvider.setTokens([
    ":smile:", "laughing", "blush", "smiley", "relaxed", "smirk",
    "heart_eyes", "kissing_heart", "kissing_closed_eyes", "flushed",
    "relieved", "satisfied", "grin", "wink", "winky_face", "grinning",
    "kissing", "kissing_smiling_eyes", "stuck_out_tongue", "sleeping",
    "worried", "frowning", "anguished", "open_mouth", "wow", "grimacing",
    "confused", "hushed", "expressionless", "unamused", "sweat_smile",
    "sweat", "weary", "pensive", "disappointed", "confounded", "fearful",
    "cold_sweat", "persevere", "cry", "sob", "joy", "astonished",
    "scream", "angry", "rage", "triumph", "sleepy", "yum", "mask",
    "sunglasses", "dizzy_face", "lips", "kiss", "mouse", "poop"
  ]);


}]);
