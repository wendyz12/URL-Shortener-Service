//handle all the logics on the page

var app = angular.module("tinyurlApp");

app.controller("homeController", ["$scope", "$http", "$location", function($scope, $http, $location){ 
// "$scope" is a variable from angular core as we don't import any package; 
//"$http" is a variable from ngResource
//"$location" is a varialbe provided by ngRoute to switch to the page you'd like to go to after getting response from post request
	$scope.submit = function() {
		$http.post("/api/v1/urls", {
			longUrl: $scope.longUrl // this longUrl is from ng-model on home.html
		})
			.success(function(data) { // this is a callback function
				$location.path("/urls/" + data.shortUrl);
			});
	}

}]);