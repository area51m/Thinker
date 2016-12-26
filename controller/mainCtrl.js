var app = angular.module("Thinker", []);

app.controller('mainCtrl', function($scope, $http, $log) {
	$scope.body = {'background-image': '#ebebeb'};
	$scope.newIdeaShow = false;
	$scope.shadowShow = false;
	$scope.selectedIdeaShow = false;
	$scope.moreIdeasBtn = false;
	// $scope.likeColor = "black";
	// $scope.dislikeColor = "black";

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
		$http.get("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/comments/idea/" + ideaId)
		.then(function(response){
			$scope.selectedIdeaComments = response.data;
				console.log($scope.selectedIdeaComments);
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

	$scope.GetLikesColorF = function(x) {
		if (x.userLikeStatus == 0) {$scope.likeColor = "black"; $scope.DislikeColor = "black";};
		if (x.userLikeStatus == 1) {$scope.likeColor = "#03FC17"; $scope.DislikeColor = "black";};
		if (x.userLikeStatus == -1) {$scope.likeColor = "black"; $scope.DislikeColor = "red";};
	};	

	$scope.LikeF = function(x) {
		if (this.likeColor == "black") {
			$http.post('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/likes/idea/'+x.ideaId, true);
			return this.likeColor = "#03FC17 !important";
		};
		if (this.likeColor == "black !important") {
			$http.post('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/likes/idea/'+x.ideaId, true);			
			return this.likeColor = "#03FC17 !important";
		};
		if (this.likeColor == "#03FC17 !important") {
			$http.delete('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/likes/idea/'+x.ideaId);
			return this.likeColor = "black !important";
		};
		if (this.likeColor == "#03FC17") {
			$http.delete('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/likes/idea/'+x.ideaId);
			return this.likeColor = "black !important";
		};		
	};

	$scope.DisLikeF = function(x) {
		if (this.DislikeColor == "black") {
			$http.post('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/'+x.ideaId, false);
			return this.DislikeColor = "red !important";
		};
		if (this.DislikeColor == "black !important") {
			$http.post('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/'+x.ideaId, false);			
			return this.DislikeColor = "red !important";
		};
		if (this.DislikeColor == "red !important") {
			$http.delete('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/'+x.ideaId);
			return this.DislikeColor = "black !important";
		};
		if (this.DislikeColor == "red") {
			$http.delete('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/'+x.ideaId);
			return this.DislikeColor = "black !important";
		};		
	};
$http.get("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/part")
	.then(function(response){
	$scope.ideas = response.data;
	if ($scope.ideas.length > 19) $scope.moreIdeasBtn = true;
	console.log($scope.ideas);
		});

	$scope.FileF = function(file) {
		if (file == undefined) return;
		else {
		// console.log(file);
		var f = (file.split('.')[0]+'/'+file.split('.')[1]);
		// console.log(f);
		return f;};
	};

		});
