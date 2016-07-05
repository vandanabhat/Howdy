'use strict';
angular.module('howdy').controller('messageDetailController', ['$scope', '$routeParams','dataFactory',
    function($scope, $routeParams, dataFactory){
    $scope.messages = dataFactory.howdychats;
    //$scope.chats = $scope.messages.chats;
    $scope.name = $routeParams.name;
    $scope.item = $scope.messages.find(function(item){
        return $scope.name === item.name
    }) || [];
}]);