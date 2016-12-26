var app = angular.module("Thinker", []);

app.controller('loginCtrl', function($scope) {
	$scope.loginForm = true;
	$scope.registerForm = false;
	$scope.iForgot = false;

	$scope.switchFormF = function() {
		$scope.loginForm = !$scope.loginForm;
		$scope.registerForm = !$scope.registerForm;
	};

	$scope.iForgotSwitchF = function() {
		$scope.loginForm = !$scope.loginForm;
		$scope.iForgot = !$scope.iForgot;
		console.log($scope.iForgot, 'YYY');
	};
});
