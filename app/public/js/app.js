var app = angular.module('tinyurlApp', ['ngRoute', 'ngResource', 'chart.js']); // Angular takes the entire app; use an angular module, angular-router.

// use router provided by Angular js
app.config(function ($routeProvider){ // "$routeProvider" is a variable provided by "ngRoute"
	$routeProvider
		.when("/", {  // if it is "#/", Angular will embed the following view by using "templateUrl"
			templateUrl: "./public/views/home.html",
			controller: "homeController" // by using controller, we can handle the data from the view
		})
		.when("/urls/:shortUrl", {
			templateUrl: "./public/views/url.html",
			controller: "urlController"
		})


});


