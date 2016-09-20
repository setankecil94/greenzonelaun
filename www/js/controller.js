var kontrol = angular.module('starter.controllers', []) 

kontrol.controller('daftar',function($scope, $http,$ionicPopup, link, $state){
	
	$scope.showAlert = function(msg) { 
		$ionicPopup.alert({
			title: msg.title, 
			template: msg.message,
			okText: 'Ok',
			okType: 'button-positive'
		}); 
	}; 

	$scope.daftar = function(){
		if (!$scope.daftar.nama) {
			$scope.showAlert({
				title: "Information",
				message: "Nama mohon diisi"
			}) 
		} else if (!$scope.daftar.username) {
			$scope.showAlert({
				title: "Information",
				message: "username mohon diisi"
			})

		} else if (!$scope.daftar.pass) {
			$scope.showAlert({
				title: "Information",
				message: "password mohon diisi"
			})
		} else if (!$scope.daftar.alamat) {
			$scope.showAlert({
				title: "Information",
				message: "Alamat mohon diisi"
			})
		} else if (!$scope.daftar.nohp) {
			$scope.showAlert({
				title: "Information",
				message: "Nomor HP mohon diisi"
			})
		} else if (!$scope.daftar.email) {
			$scope.showAlert({
				title: "Information",
				message: "Email mohon diisi"
			})
		} else {
			link.insert({
				nama: $scope.daftar.nama,
				username: $scope.daftar.username,
				pass: $scope.daftar.pass,
				alamat: $scope.daftar.alamat,
				nohp: $scope.daftar.nohp,
				email: $scope.daftar.email 

			}).success(function(data){
				$scope.showAlert({
					title: "Information",
					message: "data berhasil disimpan"
				})
			}).error(function(data){
				$scope.showAlert({
					title: "Information",
					message: "periksa masukan anda"
				})
			})
			$scope.daftar.nama = '';
			$scope.daftar.username = '';
			$scope.daftar.pass = '';
			$scope.daftar.alamat = '' ;
			$scope.daftar.nohp = '';
			$scope.daftar.email = '';
		}
	}	
})

kontrol.controller('login',function($scope, $http,$ionicPopup,$state,$ionicHistory){
	// 192.168.42.47
	var baseUrl = 'http://192.168.42.47/grenzone/php/';
	$scope.showAlert = function(msg) {
		$ionicPopup.alert({
			title: msg.title,
			template: msg.message,
			okText: 'Ok',
			okType: 'button-positive'
		})
	}

	$scope.login = function(){
		if (!$scope.login.username) {
			$scope.showAlert({
				title: "Information",
				message: "username mohon diisi"
			})
		} else if (!$scope.login.pass) {
			$scope.showAlert({
				title: "Information",
				message: "password mohon diisi"
			})

		} else {
			$http.get(baseUrl+"login.php?username=" + $scope.login.username + "&pass=" + $scope.login.pass)
			.success(function(data){
				
				if (data.username === $scope.login.username && data.pass === $scope.login.pass){
					$scope.user_details = data;
					sessionStorage.setItem('id', $scope.user_details.id);
					sessionStorage.setItem('nama', $scope.user_details.nama);
					sessionStorage.setItem('username', $scope.user_details.username);
					sessionStorage.setItem('pass', $scope.user_details.pass);
					sessionStorage.setItem('alamat', $scope.user_details.alamat);
					sessionStorage.setItem('nohp', $scope.user_details.nohp);
					sessionStorage.setItem('email', $scope.user_details.email);
					sessionStorage.setItem('level', $scope.user_details.level);

					$scope.showAlert({
						title: "Information",
						message: "Welcome " + $scope.user_details.nama
					})

					if ($scope.user_details.level === "0") {
						$state.go('beranda');
					} else if ($scope.user_details.level === "kurir"){
						$state.go('kberanda');
					}

				} else {
					$scope.showAlert({
						title: "Information",
						message: "Periksa Masukan Anda"
					})
					$scope.login.username = '';
					$scope.login.pass = '';

				}
			})
		}
	}
})

kontrol.controller('beranda',function($scope, $state){

		$scope.logout = function(){
		delete sessionStorage.id;
		delete sessionStorage.email;
		delete sessionStorage.user;
		delete sessionStorage.pass;
		$state.go('login');
		}
})

kontrol.controller('order',function($scope, $http, $cordovaGeolocation, $ionicPopup, link, $state, $ionicHistory){
	
	$scope.detailnama= sessionStorage.getItem('nama');

	$scope.showAlert = function(msg) {
		$ionicPopup.alert({
			title: msg.title,
			template: msg.message,
			okText: 'Ok',
			okType: 'button-positive'
		});
	}; 

	$scope.order = function(){

		var options = {timeout: 10000, enableHighAccuracy: true};
		$cordovaGeolocation.getCurrentPosition(options).then(function(position){

			var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			if (!$scope.order.alamat2) {
			$scope.showAlert({
				title: "Information",
				message: "Alamat mohon diisi"
			}) 

			} else if (!$scope.order.paket) {
			$scope.showAlert({
				title: "Information",
				message: "Paket mohon Dipilih"
			})

			} else {			
			link.orderan({
				username: $scope.detailnama,
				alamat2: $scope.order.alamat2,
				paket: $scope.order.paket,
				lat : position.coords.latitude,
				lng : position.coords.longitude	

			}).success(function(data2){
				$scope.showAlert({
					title: "Information",
					message: "Order berhasil dilakukan"
				})

			}).error(function(data2){
				$scope.showAlert({
					title: "Information",
					message: "periksa masukan anda"
				})
			})	

			$scope.order.alamat2 = '';
			$scope.order.paket = '';
		

		}}, function(error){
			console.log("Could not get location");
		});
 
	};
}) 

kontrol.controller('status', function($scope, $http){

	var baseUrl = 'http://192.168.42.47/grenzone/php/';
	$http.get(baseUrl+"status.php?id=")
	.then(function(response) {
		$scope.test = response.data;
		sessionStorage.setItem('paket', $scope.test.paket);
	})	
	
	$scope.detailnama= sessionStorage.getItem('nama');
	$scope.detailpaket= sessionStorage.getItem('paket');
})

kontrol.controller('orderan', function($scope,$http) {
	var baseUrl = 'http://192.168.42.47/grenzone/php/';
	$http.get(baseUrl+"orderan.php")
	.then(function(response) {
		$scope.test = response.data;
	})		
})

kontrol.controller('orderanId', function($scope,$http,$stateParams) {
	var baseUrl = 'http://192.168.42.47/grenzone/php/';
	$http.get(baseUrl+"orderanId.php?id=" + $stateParams.idOrder)
	.then(function(response) {
		$scope.test = response.data;
		sessionStorage.setItem('idOrder', $scope.test.id);
		sessionStorage.setItem('userOrder', $scope.test.user);
		sessionStorage.setItem('latOrder', $scope.test.lat);
		sessionStorage.setItem('lngOrder', $scope.test.lng);
		
	})	
})

kontrol.controller('goto', function($scope,$cordovaGeolocation, $ionicLoading){

	$ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Melacak Lokasi!'
        });

	$scope.id= sessionStorage.getItem('idOrder');
	$scope.nama= sessionStorage.getItem('namaorder');
	$scope.alamat= sessionStorage.getItem('userOrder');
	$scope.lat= sessionStorage.getItem('latOrder');
	$scope.lng= sessionStorage.getItem('lngOrder');
	var options = {timeout: 10000, enableHighAccuracy: true};

	$scope.tampilmap = function(){

		$cordovaGeolocation.getCurrentPosition(options).then(function(position){

			var start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			var end = new google.maps.LatLng($scope.lat, $scope.lng);

			var mapOptions = {
				streetViewControl:true,
				center: start,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(document.getElementById("map"),mapOptions);

			var kurir = new google.maps.Marker({
				position: start,
				map: map,
				title: 'Kurir'
			});

			var infoWindowkurir = new google.maps.InfoWindow({
				content: "Kurir"
			});

			google.maps.event.addListener(kurir, 'click', function () {
				infoWindowkurir.open($scope.map, kurir);
			});

			var pelanggan = new google.maps.Marker({
				position: end,
				map: map,
				title: 'User Location'
			});

			var infoWindowpelanggan = new google.maps.InfoWindow({
				content: "Pelanggan"
			});

			google.maps.event.addListener(pelanggan, 'click', function () {
				infoWindowpelanggan.open($scope.map, pelanggan);
			});


			var directionsService = new google.maps.DirectionsService();
			var directionsDisplay = new google.maps.DirectionsRenderer();

			var request = {
				origin : start,
				destination : end,
				travelMode : google.maps.TravelMode.DRIVING
			};

			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				}
			});
			directionsDisplay.setMap(map);
			$ionicLoading.hide(); 
		}, function(error){
			$ionicLoading.hide(); 
			console.log("Could not get location");
		});	
	}	
	$scope.tampilmap();	
})

kontrol.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading) {

	$ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Melacak Lokasi!'
        });

	var options = {timeout: 10000, enableHighAccuracy: true};

	$cordovaGeolocation.getCurrentPosition(options).then(function(position){

		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


		var mapOptions = {
			center: latLng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

		google.maps.event.addListenerOnce($scope.map, 'idle', function(){
			
			var marker = new google.maps.Marker({
				map: $scope.map,
				animation: google.maps.Animation.DROP,
				position: latLng
			});      
			
			var infoWindow = new google.maps.InfoWindow({
				content: "Posisi saya"
			});
			
			google.maps.event.addListener(marker, 'click', function () {
				infoWindow.open($scope.map, marker);
			});
			$ionicLoading.hide(); 
		});
	}, function(error){
		$ionicLoading.hide(); 
		console.log("Could not get location");
	});
})

kontrol.controller('SlidesCtrl', function() {
  this.slides = [
    { title: 'Paket 1', id: 1, description: 'Murah meriah', thumb: 'img/paket1.jpg', full: 'img/paket1.jpg' },
    { title: 'Paket 2', id: 2, description: 'murahlah', thumb: 'img/paket2.jpg', full: 'img/paket2.jpg' },
    { title: 'Paket 3', id: 3, description: 'Murah', thumb: 'img/paket3.jpg', full: 'img/paket3.jpg' },
    { title: 'Paket 4', id: 4, description: 'Mahal', thumb: 'img/paket4.jpg', full: 'img/paket4.jpg' }
  ]
})

kontrol.controller('cariRute', function($scope, $state, $cordovaGeolocation, $http) {
	$scope.id= sessionStorage.getItem('idOrder');
	$scope.lat= sessionStorage.getItem('latOrder');
	$scope.lng= sessionStorage.getItem('lngOrder');
	$scope.satu="true";
	$scope.dua="true";
	$scope.tiga="true";

	var options = {timeout: 10000, enableHighAccuracy: true};

	$scope.cari = function (){

		$scope.routeI = function(){
			$cordovaGeolocation.getCurrentPosition(options).then(function(position){

				var start = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

				var b = new google.maps.LatLng(-5.137771, 119.483413);

				var end = new google.maps.LatLng($scope.lat, $scope.lng);

				var mapOptions = {
					streetViewControl:true,
					center: start,
					zoom: 16,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};


				var map = new google.maps.Map(document.getElementById("map"),mapOptions);

				var marker = new google.maps.Marker({
					position: start,
					map: map,
					title: 'Strathblane (Job Location)'
				});

				var hospitalRoute = new google.maps.Marker({
					position: end,
					map: map,
					title: 'Hospital (Stobhill)'
				});

				var directionsService = new google.maps.DirectionsService();
				var directionsDisplay = new google.maps.DirectionsRenderer();

				var request = {
					origin : start,
					destination : end,
					waypoints: [
					{
						location: b,
						stopover: true
					}],
					travelMode : google.maps.TravelMode.DRIVING
				};

				directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
						var total = 0;
						var route = response.routes[0];
						for (var i = 0; i < route.legs.length; i++) {
							rute1 = i;
							total +=  route.legs[i].distance.value;
						}
						$scope.rute1 = rute1;
						total = total / 1000;
						$scope.jarak = total +' km';
					}
				});

				directionsDisplay.setMap(map);


			});
		}

		$scope.routeII = function(){
			$cordovaGeolocation.getCurrentPosition(options).then(function(position){

				var start = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

				var b = new google.maps.LatLng(-5.137773, 119.483431);
				var c = new google.maps.LatLng(-5.135511, 119.483517);

				var end = new google.maps.LatLng($scope.lat, $scope.lng);

				var mapOptions = {
					streetViewControl:true,
					center: start,
					zoom: 16,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};


				var map = new google.maps.Map(document.getElementById("map2"),mapOptions);


				var marker = new google.maps.Marker({
					position: start,
					map: map,
					title: 'Strathblane (Job Location)'
				});

				var hospitalRoute = new google.maps.Marker({
					position: end,
					map: map,
					title: 'Hospital (Stobhill)'
				});

				var directionsService = new google.maps.DirectionsService();
				var directionsDisplay = new google.maps.DirectionsRenderer();

				var request = {
					origin : start,
					destination : end,
					waypoints: [
					{
						location: b,
						stopover: true
					},
					{
						location: c,
						stopover: true
					}],
					travelMode : google.maps.TravelMode.DRIVING
				};

				directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
						var total = 0;
						var route2 = response.routes[0];
						for (var i = 0; i < route2.legs.length; i++) {
							rute2 = i;
							total +=  route2.legs[i].distance.value;
						}
						$scope.rute2 = rute2;
						total2 = total / 1000;
						$scope.jarak2 = total2 +' km';
					}
				});

				directionsDisplay.setMap(map);


			})
		}
		$scope.routeIII = function(){
			$cordovaGeolocation.getCurrentPosition(options).then(function(position){

				var start = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

				var b = new google.maps.LatLng(-5.138020, 119.483717);
				var c = new google.maps.LatLng(-5.137076, 119.485051);
				var d = new google.maps.LatLng(-5.134566, 119.484743);

				var end = new google.maps.LatLng($scope.lat, $scope.lng);

				var mapOptions = {
					streetViewControl:true,
					center: start,
					zoom: 16,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};


				var map = new google.maps.Map(document.getElementById("map3"),mapOptions);

				var marker = new google.maps.Marker({
					position: start,
					map: map,
					title: 'Strathblane (Job Location)'
				});

				var hospitalRoute = new google.maps.Marker({
					position: end,
					map: map,
					title: 'Hospital (Stobhill)'
				});

				var directionsService = new google.maps.DirectionsService();
				var directionsDisplay = new google.maps.DirectionsRenderer();

				var request = {
					origin : start,
					destination : end,
					waypoints: [
					{
						location: b,
						stopover: true
					},
					{
						location: c,
						stopover: true
					},
					{
						location: d,
						stopover: true
					}],
					travelMode : google.maps.TravelMode.DRIVING
				};

				directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
						var total = 0;
						var route3 = response.routes[0];
						for (var i = 0; i < route3.legs.length; i++) {
							
							rute3 = i;
							total +=  route3.legs[i].distance.value;
						}
						$scope.rute3 = rute3;
						total3 = total / 1000;
						$scope.jarak3 = total3 +' km';
					}
				});

				directionsDisplay.setMap(map);
			})
		}


		$scope.routeI();

		$scope.routeII();

		$scope.routeIII();

	}

	$scope.doRefresh = function (){
		setTimeout(function() {
			$scope.cari();		
			$scope.$broadcast('scroll.refreshComplete');
		}, 1000);
	}
	$scope.cari();	
})

kontrol.controller('rute', function($scope, $state, $cordovaGeolocation, $stateParams) {
	$scope.id= sessionStorage.getItem('idOrder');
	$scope.lat= sessionStorage.getItem('latOrder');
	$scope.lng= sessionStorage.getItem('lngOrder');

	var options = {timeout: 10000, enableHighAccuracy: true};
	var options2 = {timeout: 10000, enableHighAccuracy: true};

	$scope.routeI = function(){
		$cordovaGeolocation.getCurrentPosition(options).then(function(position){

			var start = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

			var b = new google.maps.LatLng(-5.137771, 119.483413);

			var end = new google.maps.LatLng($scope.lat, $scope.lng);

			var mapOptions = {
				streetViewControl:true,
				center: start,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};


			var map = new google.maps.Map(document.getElementById("map2"),mapOptions);

			var marker = new google.maps.Marker({
				position: start,
				map: map,
				title: 'Strathblane (Job Location)'
			});

			var hospitalRoute = new google.maps.Marker({
				position: end,
				map: map,
				title: 'Hospital (Stobhill)'
			});


			var directionsService = new google.maps.DirectionsService();
			var directionsDisplay = new google.maps.DirectionsRenderer();

			var request = {
				origin : start,
				destination : end,
				waypoints: [
				{
					location: b,
					stopover: true
				}],
				travelMode : google.maps.TravelMode.DRIVING
			};

			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				}
			});
			directionsDisplay.setMap(map);
		});
	}

	$scope.routeII = function(){
		$cordovaGeolocation.getCurrentPosition(options).then(function(position){

			var start = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

			var b = new google.maps.LatLng(-5.137773, 119.483431);
			var c = new google.maps.LatLng(-5.135511, 119.483517);

			var end = new google.maps.LatLng($scope.lat, $scope.lng);

			var mapOptions = {
				streetViewControl:true,
				center: start,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};


			var map = new google.maps.Map(document.getElementById("map2"),mapOptions);

			var marker = new google.maps.Marker({
				position: start,
				map: map,
				title: 'Strathblane (Job Location)'
			});

			var hospitalRoute = new google.maps.Marker({
				position: end,
				map: map,
				title: 'Hospital (Stobhill)'
			});


			var directionsService = new google.maps.DirectionsService();
			var directionsDisplay = new google.maps.DirectionsRenderer();

			var request = {
				origin : start,
				destination : end,
				waypoints: [
				{
					location: b,
					stopover: true
				},
				{
					location: c,
					stopover: true
				}],
				travelMode : google.maps.TravelMode.DRIVING
			};

			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				}
			});
			directionsDisplay.setMap(map);
		})
	}

	$scope.routeIII = function(){
		$cordovaGeolocation.getCurrentPosition(options).then(function(position){

			var start = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

			var b = new google.maps.LatLng(-5.138020, 119.483717);
			var c = new google.maps.LatLng(-5.137076, 119.485051);
			var d = new google.maps.LatLng(-5.134566, 119.484743);

			var end = new google.maps.LatLng($scope.lat, $scope.lng);

			var mapOptions = {
				streetViewControl:true,
				center: start,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};


			var map = new google.maps.Map(document.getElementById("map2"),mapOptions);

			var marker = new google.maps.Marker({
				position: start,
				map: map

			});

			var hospitalRoute = new google.maps.Marker({
				position: end,
				map: map

			});

			var directionsService = new google.maps.DirectionsService();
			var directionsDisplay = new google.maps.DirectionsRenderer();

			var request = {
				origin : start,
				destination : end,
				waypoints: [
				{
					location: b,
					stopover: true
				},
				{
					location: c,
					stopover: true
				},
				{
					location: d,
					stopover: true
				}],
				travelMode : google.maps.TravelMode.DRIVING
			};

			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				}
			});
			directionsDisplay.setMap(map);
		})
	}

	$scope.rute = $stateParams.idRute;
	if ($scope.rute === 'I') {
		$scope.routeI();
	}else if ($scope.rute === 'II') {
		$scope.routeII();
	} else if ($scope.rute === 'III'){
		$scope.routeIII();
	}
});

