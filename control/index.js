var app = angular.module('sua', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when('/index', {
			controller: 'indexCtrl',
			templateUrl: 'view/index.html'
		}).when('/zuixin', {
			controller: 'page02Ctrl',
			templateUrl: 'view/zuixin.html'
		}).when('/hours', {
			controller: 'hoursCtrl',
			templateUrl: 'view/hours.html'
		}).when('/football', {
			controller: 'footballCtrl',
			templateUrl: 'view/football.html'
		}).when('/basketball', {
			controller: 'basketballCtrl',
			templateUrl: 'view/basketball.html'
		}).when('/detial_index/:id', {
			controller: 'detial_indexCtrl',
			templateUrl: 'view/detial_index.html'
		})
		.otherwise({
			redirectTo: '/index'
		})
});
//导航页面控制器
app.controller('navCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
	$rootScope.menu = true;
	$http.jsonp('http://127.0.0.1:8888/nav?&callback=JSON_CALLBACK').success(function(data) {
		console.log('请求成功');
		console.log(data);
		$scope.mesgs = data;
	})

	//	$rootScope.fnck = function(e) {
	//		//this.style.color='red';
	//		console.log(e.target);
	//		angular.element(e.target).parent().parent().children().children().removeClass('nav_active');
	//		angular.element(e.target).addClass("nav_active");
	//
	//	}
}]);
//导航组件化
//组件的应用，在组件中操作DOM
app.directive('navs', ['$location', function($location) {
		return {
			restrict: 'AECM',
			repalce: true,
			transclude: true,
			template: '<a href="#/index" class="nav_active">{{mesgs[0].name}}</a>' +
				'<a href="#/zuixin">{{mesgs[1].name}}</a>' +
				'<a href="#/hours">{{mesgs[2].name}}</a>' +
				'<a href="#/football">{{mesgs[3].name}}</a>' +
				'<a href="#/basketball">{{mesgs[4].name}}</a>',
			link: function(scope, element, attrs) {
				var oBox = document.getElementById('a_box');
				var aAs = oBox.getElementsByTagName('a');
				//console.log(location.hash);
				switch(location.hash) {
					case "#/index":
						angular.element(aAs).removeClass('nav_active');
						angular.element(aAs[0]).addClass('nav_active');
						break;
					case "#/zuixin":
						angular.element(aAs).removeClass('nav_active');
						angular.element(aAs[1]).addClass('nav_active');
						break;
					case "#/hours":
						angular.element(aAs).removeClass('nav_active');
						angular.element(aAs[2]).addClass('nav_active');
						break;
					case "#/football":
						angular.element(aAs).removeClass('nav_active');
						angular.element(aAs[3]).addClass('nav_active');
						break;
					case "#/basketball":
						angular.element(aAs).removeClass('nav_active');
						angular.element(aAs[4]).addClass('nav_active');
						break;
				}
				angular.element(aAs).on('click', function(e) {
					angular.element(aAs).removeClass('nav_active');
					angular.element(this).addClass('nav_active');
				});
			}

		}
	}])
	//首页新闻控制器
app.controller('indexCtrl', ['$scope', '$http', function($scope, $http) {
		alert('进入首页控制器');
		$http.jsonp('http://127.0.0.1:8888/page01?&callback=JSON_CALLBACK').success(function(data) {
			console.log('请求成功');
			console.log(data.datas);
			$scope.mesgs = data.datas;
		})
	}])
	//最新页控制器，轮播图
app.controller('page02Ctrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
		$http.jsonp('http://127.0.0.1:8888/page02?&callback=JSON_CALLBACK').success(function(data) {
				console.log('请求成功第二个页面');
				console.log(data.datas);
				$scope.mesgs = data.datas;
				//控制菜单的显示隐藏
			//swiper提供的js一定要写在这个控制器里
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					paginationClickable: true,
					spaceBetween: 30,
					centeredSlides: true,
					autoplay: 2500,
					autoplayDisableOnInteraction: false
				});
			})
			//控制菜单的显示隐藏
			//swiper提供的js一定要写在这个控制器里
	}])
	//  最新页控制器,轮播下方列表部分
app.controller('page02_detil_Ctrl', ['$scope', '$http', function($scope, $http) {
	$http.jsonp('http://127.0.0.1:8888/page02_detil?&callback=JSON_CALLBACK').success(function(data) {
		console.log('请求成功第二个页面的列表页');
		console.log(data.datas);
		$scope.mesgs = data.datas;
	})
}])

//24H页面控制器
app.controller('hoursCtrl', ["$scope", '$http', function($scope, $http) {
		$http.jsonp('http://127.0.0.1:8888/hours?&callback=JSON_CALLBACK').success(function(data) {
			console.log('请求成功第三个页面的列表页');
			console.log(data.datas);
			$scope.mesgs = data.datas;
		})
	}])
	//足球页面控制器
app.controller('footballCtrl', ["$scope", '$http', function($scope, $http) {
		$http.jsonp('http://127.0.0.1:8888/football?&callback=JSON_CALLBACK').success(function(data) {
			console.log('请求成功第四个页面的列表页');
			console.log(data.datas);
			$scope.mesgs = data.datas;
		})
	}])
	//篮球页面控制器
app.controller('basketballCtrl', ["$scope", '$http', function($scope, $http) {
	$http.jsonp('http://127.0.0.1:8888/basketball?&callback=JSON_CALLBACK').success(function(data) {
		console.log('请求成功第五个页面的列表页');
		console.log(data.datas);
		$scope.mesgs = data.datas;
	})
}])

//首页详情页面控制器
app.controller('detial_indexCtrl', ["$scope", "$routeParams", '$http', function($scope, $routeParams, $http) {
	//	alert('进入详情页的控制器');
	$http.jsonp('http://127.0.0.1:8888/page01?&callback=JSON_CALLBACK').success(function(data) {
		console.log('请求成功');
		console.log(data.datas);
		var detialurl = data.datas[$routeParams.id].detailurl;
		$http.jsonp('http://127.0.0.1:8888/detial_index?&callback=JSON_CALLBACK&bianlian=' + detialurl).success(function(data) {
			//		console.log('请求成功第1个页面的详情页');
			console.log(data);
			$scope.mesgs = data;
			var discrip = document.getElementById('discrip');
			discrip.innerHTML = $scope.mesgs.detail[3].content;
		})
	})
}])