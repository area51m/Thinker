var app = angular.module("Thinker", []);

app.controller('loginCtrl', function($scope) {
	$scope.loginForm = true;
	$scope.registerForm = false;

	$scope.switchFormF = function() {
		$scope.loginForm = !$scope.loginForm;
		$scope.registerForm = !$scope.registerForm;
	};	
});
