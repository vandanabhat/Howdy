'use strict';
angular.module('howdy').controller('messageDetailController', ['$scope', '$routeParams', '$timeout', '$sce','dataFactory', 'emoticons', '$location',
    function($scope, $routeParams, $timeout, $sce, dataFactory, emoticons, $location){

        $scope.messages = dataFactory.howdychats;
        $scope.name = $routeParams.name;

        var scrolled = 0;
        var scrollToBottom = function(){
            scrolled = scrolled + 300;
            $(".chat-content").stop().animate({
                scrollTop: scrolled
            });
        };

        $scope.goBackHome = function(){
            $location.path('/messages');
        };

        //get chats from data factory
        $scope.item = $scope.messages.find(function(item){
            return $scope.name === item.name
        }) || [];

        //stores chats in data factory
        $scope.sendMessage = function(){
            if($scope.text || $scope.text == "") return;
            $scope.item.chats.push({name:"me", text:$scope.text});
            $scope.text = '';
            scrollToBottom();
        };

        //reds image URL and stores image in base64 format
        var readURL = function(input) {
            //return if file size is more than 2MB
            if (input.files && input.files[0] && input.files[0].size < 2000000) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $scope.item.chats.push({name:"me", picture:e.target.result});
                    $timeout(function(){
                        $scope.item.chats;
                        scrollToBottom();
                    });
                };

                reader.readAsDataURL(input.files[0]);
            }
        };

        //when image changes triggers this event
        $("#imageUpload").change(function(){
            readURL(this);
        });
    }]);

