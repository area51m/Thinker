var app = angular.module("Thinker", []);

app.controller('mainCtrl', function($scope, $http, $log) {
	$scope.body = {'background-image': '#ebebeb'};
	$scope.newIdeaShow = false;
	$scope.shadowShow = false;
	$scope.selectedIdeaShow = false;
	$scope.moreIdeasBtn = false;
	$scope.mainpage = 'active';
	$scope.userideas = '';
	$scope.likeColor = "black";
	$scope.dislikeColor = "black";

	//Первый запрос
	$http.get("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/part")
	.then(function(response){
		$scope.ideas = response.data;
		if ($scope.ideas.length > 19) $scope.moreIdeasBtn = true;
		//console.log($scope.ideas);
	});

	//Возврат на основную страницу
	$scope.MainPageF = function() {
	$scope.mainpage = 'active';
	$scope.userideas = '';
	$scope.ideas.delete;
	$http.get("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/part")
	.then(function(response){
		$scope.ideas = response.data;
		if ($scope.ideas.length > 19) $scope.moreIdeasBtn = true;
		console.log($scope.ideas);
		});
	};

	//Зпрос по ID пользователя но нет ID у меня)))
	$scope.UserIdeasF = function() {
	$scope.mainpage = '';
	$scope.userideas = 'active';
	$scope.ideas.delete;
	//ТУТ ДРУГОЙ ПУТЬ
	$http.get("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/my/part")
	.then(function(response){
		$scope.ideas = response.data;
		if ($scope.ideas.length > 19) $scope.moreIdeasBtn = true;
		console.log($scope.ideas);
		});
	};


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
		// $http.get("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/comments/idea/" + ideaId)
		// .then(function(response){
		// 	$scope.selectedIdeaComments = response.data;
		// 		console.log($scope.selectedIdeaComments);
		// 	});
	};

	$scope.DeleteShowF = function() {
		if ($scope.userideas == 'active') return true;
		else return false;
	};
	$scope.DeleteIdeaF = function(selectedIdea) {
		console.log($scope.selectedIdea.ideaId + ' must be deleted');
		$http.delete('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/' + selectedIdea.ideaId);
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

	// $scope.GetLikesColorF = function(likeColor, DislikeColor, x) {
	// 	console.log(likeColor, DislikeColor);
	// 	var likeStatus = x.userLikeStatus;
	// 	if (likeStatus == 0) return [this.likeColor = "black", this.DislikeColor = "black",];
	// 	if (likeStatus == 1) return [this.likeColor = "#03FC17", this.DislikeColor = "black",];
	// 	if (likeStatus == -1) return [this.likeColor = "black", this.DislikeColor = "red",];
	// 	console.log(likeColor, DislikeColor);
	// };	

	$scope.LikeF = function(likeColor, DislikeColor, x) {
		if (this.DislikeColor == "red") {x.dislikes = x.dislikes -1;};
		if (this.DislikeColor == "red !important") {x.dislikes = x.dislikes -1;};
		if (this.likeColor == "black") {
			var status = JSON.stringify({ "status" : true });
			x.likes = x.likes+1;
			$http.post('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/likes/idea/'+x.ideaId, status);
			return [this.likeColor = "#03FC17 !important", this.DislikeColor = "black"];
		};
		if (this.likeColor == "black !important") {
			var status = JSON.stringify({ "status" : true });
			x.likes = x.likes+1;
			$http.post('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/likes/idea/'+x.ideaId, status);			
			return [this.likeColor = "#03FC17 !important", this.DislikeColor = "black"];
		};
		if (this.likeColor == "#03FC17 !important") {
			x.likes = x.likes-1;
			$http.delete('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/likes/idea/'+x.ideaId);
			return [this.likeColor = "black !important", this.DislikeColor];
		};
		if (this.likeColor == "#03FC17") {
			x.likes = x.likes-1;
			$http.delete('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/likes/idea/'+x.ideaId);
			return [this.likeColor = "black !important", this.DislikeColor];
		};
	};

	$scope.DisLikeF = function(likeColor, DislikeColor, x) {
		if (this.likeColor == "#03FC17") {x.likes = x.likes -1;};
		if (this.likeColor == "#03FC17 !important") {x.likes = x.likes -1;};
		if (this.DislikeColor == "black") {
			var status = JSON.stringify({ "status" : false });
			x.dislikes = x.dislikes +1;
			$http.post('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/'+x.ideaId, false);
			return [this.DislikeColor = "red !important", this.likeColor = "black"];
		};
		if (this.DislikeColor == "black !important") {
			var status = JSON.stringify({ "status" : false });
			x.dislikes = x.dislikes +1;
			$http.post('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/'+x.ideaId, false);			
			return [this.DislikeColor = "red !important", this.likeColor = "black"];
		};
		if (this.DislikeColor == "red !important") {
			x.dislikes = x.dislikes -1;
			$http.delete('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/'+x.ideaId);
			return this.DislikeColor = "black !important";
		};
		if (this.DislikeColor == "red") {
			x.dislikes = x.dislikes -1;
			$http.delete('http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/'+x.ideaId);
			return this.DislikeColor = "black !important";
		};		
	};

	$scope.SearchF = function(SearchRequest) {
		$scope.mainpage = '';
		$scope.userideas = '';
		var config = JSON.stringify({ "criteria": "name", "content" : SearchRequest, "part" : "" });
		$http.post("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/search", config)
		.then(function(response){
			$scope.ideas = response.data;
			});
	};
	$scope.SearchByAuthor = function(selectedIdea) {
		$scope.mainpage = '';
		$scope.userideas = '';
		$scope.close();
		var config = JSON.stringify({criteria:"author", content: selectedIdea.userId, part: "", });
		$http.post("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/search", config)
		.then(function(response){
			$scope.ideas = response.data;
			});
	};
	$scope.SearchTag = function(tag) {
		$scope.mainpage = '';
		$scope.userideas = '';
		$scope.close();
		var config = JSON.stringify({criteria:"tags", content: tag, part: "", });
		$http.post("http://thinker-codeart.44fs.preview.openshiftapps.com/restapi/ideas/search", config)
		.then(function(response){
			$scope.ideas = response.data;
			});
	};

	$scope.FileF = function(file) {
		// console.log(file);
		if (file == undefined) return;
		else {
		var f = (file.split('.')[0]+'/'+file.split('.')[1]);
		// console.log(f);
		return f;};
	};

});
