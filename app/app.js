
$(document).foundation();

var app = angular.module('angular-demo', ['ngAnimate']);

app.factory('Spotify', ['$http', function($http) {
  var api = 'https://api.spotify.com/v1/search';

  return {
    search: function(query, type) { return $http.get(api + '?q=' + query + '&type=' + type); }
  };
}]);

app.controller('MainController', ['$scope', function($scope) {
  $scope.libraries = [
    { name: 'Angular', version: '1.5.3', url: 'https://angularjs.org' },
    { name: 'Foundation', version: '6.2.0', url: 'http://foundation.zurb.com' },
    { name: 'jQuery', version: '2.2.2', url: 'http://jquery.com' },
  ];
  $scope.software = [
    { name: 'Bower', version: '1.7.7', url: 'http://bower.io' },
    { name: 'Visual Studio Code', version: '0.10.11', url: 'https://code.visualstudio.com' }
  ];
}]);

app.controller('SpotifySearchController', ['$scope', 'Spotify', function($scope, Spotify) {
  $scope.query = '';
  $scope.results = [];
  $scope.error = '';
  $scope.types = ['artist', 'album', 'track'];
  $scope.type = $scope.types[0];
  $scope.searching = false;

  function search(query, type) {
    $scope.error = '';
    $scope.results = [];
    if (query && query !== '') {
      $scope.searching = true;
      Spotify.search(query, type).then(function(res) {
        $scope.searching = false;
        $scope.results = eval('res.data.' + type + 's.items');
      }, function(res) {
        $scope.error = res.statusText;
        $scope.searching = false;
      });
    }
  }

  $scope.$watch('query', function(value) {
    search(value, $scope.type);
  });

  $scope.$watch('type', function(value) {
    search($scope.query, value);
  });
}]);