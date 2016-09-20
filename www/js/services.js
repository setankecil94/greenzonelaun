var servis = angular.module('starter.services', [])

servis.factory('link',function($http){
	var baseUrl = 'http://192.168.42.47/grenzone/php/';
	return{
		insert: function (data){ 
			return $http.post(baseUrl+'daftar.php',data,{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
				}
			}) 
		},

		orderan: function (data2){
			return $http.post(baseUrl+'order.php',data2,{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
				}
			})
		},  

		lihatPesan: function() {
            return $http.get(baseUrl+'orderan.php');
        },
		
	};
})	
  