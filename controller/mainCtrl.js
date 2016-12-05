var app = angular.module("Thinker", []);

app.controller('mainCtrl', function($scope, $http, $log) {
	$scope.body = {'background-image': '#ebebeb'};
	$scope.newIdeaShow = false;
	$scope.shadowShow = false;
	$scope.selectedIdeaShow = false;

	$scope.newIdeaShowF = function() {
		$scope.shadowShow = true;
		$scope.newIdeaShow = true;
	};

	$scope.selectedIdeaShowF = function(ideaId) {
		$scope.selectedIdeaShow = true;
		$scope.shadowShow = true;
		$http.get("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/" + ideaId)
		.then(function(response){
			$scope.selectedIdea = response.data;
        		//console.log($scope.selectedIdea);
        	});
		$http.get("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/likes/idea" + ideaId)
		.then(function(response){
			$scope.selectedIdeaLikes = response.data;
        		//console.log($scope.selectedIdeaLikes);
        	});
		$http.get("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/comments/idea" + ideaId)
		.then(function(response){
			$scope.selectedIdeaComments = response.data;
				//console.log($scope.selectedIdeaComments);
			});

	};

	$scope.close = function() {
		if ($scope.newIdeaShow) $scope.newIdeaShow = false;
		if ($scope.shadowShow) $scope.shadowShow = false;
		if ($scope.selectedIdeaShow) $scope.selectedIdeaShow = false;
		if ($scope.adminShow) $scope.adminShow = false;
	};

	$scope.shadowClick = function() {
		if ($scope.newIdeaShow) $scope.newIdeaShow = false;
		if ($scope.shadowShow) $scope.shadowShow = false;
		if ($scope.selectedIdeaShow) $scope.selectedIdeaShow = false;
	};

	$http.get("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/part")
	.then(function(response){
		$scope.ideas = response.data;
        	//console.log($scope.ideas);
        });

});
