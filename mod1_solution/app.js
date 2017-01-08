//IIFE
(function(){
    'use strict'
    angular.module('LunchCheck', [])

    .controller('LunchCheckController', DIController);

    DIController.$inject = ['$scope'];

    function DIController($scope){
        $scope.lunchMenu = '';
        $scope.verifyItemCount = function(){            
            var lunchItems = $scope.lunchMenu.split(',');
            for(var indx = lunchItems.length-1; indx >= 0 ; indx--){
                var elem = lunchItems[indx].trim()
                if(elem == "" || elem == "\"\"" || elem == "''"){
                    lunchItems.splice(indx, 1);
                }
            }
            var len = lunchItems.length;
            if(len == 1 && lunchItems[0] == ''){
                $scope.lunchMsg = 'Please enter data first';
                $scope.msgStyle = {'color':'red'};
            } else if(len > 3){
                $scope.lunchMsg = 'Too much';
                $scope.msgStyle = {'color':'green'};
            } else if (len <= 3 && len > 0){
                $scope.lunchMsg = 'Enjoy!';
                $scope.msgStyle = {'color':'green'};
            } else {
                $scope.lunchMsg = 'Please enter data first';
                $scope.msgStyle = {'color':'red'};
            }           
        }
    }
})();