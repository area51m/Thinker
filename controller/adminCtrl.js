var app = angular.module("Thinker", []);

app.controller('adminCtrl', function($scope, $http) {
 $scope.body = {'background-image': '#ebebeb'};

 $http.get("http://codeart-thinker.herokuapp.com/restapi/users")
 .then(function(response) {
  $scope.users = response.data;
  
});

});