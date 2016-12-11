var app = angular.module("Thinker", []);

app.controller('userCtrl', function($scope, $http) {
 $scope.body = {'background-image': '#ebebeb'};

 $http.get("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/users")
 .then(function(response) {
  $scope.users = response.data;
  
});

});