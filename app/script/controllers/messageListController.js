'use strict';
angular.module('howdy').controller('messageListController', ['$scope', '$location', 'dataFactory', function($scope, $location, dataFactory){
    $scope.messages = dataFactory.howdychats;
    $scope.showChatDetail = function(name){
        $location.path('/message-detail').search({name:name});
    };
}]);