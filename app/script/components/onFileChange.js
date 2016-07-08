angular.module('howdy').directive('onFileChange', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('change', function(event){
                scope.$apply(function(){
                    scope.$eval(attrs.onFileChange);
                });

                event.preventDefault();
            });
        }
    };
});