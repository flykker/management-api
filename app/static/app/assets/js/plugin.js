// the module should depend on 'core' to use the stock Angular components

angular.module('plugin.website', ['app']);

angular.module('app').config(function($routeProvider){
    $routeProvider.when('/plugins/demo2', {
        templateUrl: 'assets/tpl/demo2.html',
        controller: 'TablesDataController',
    }).when('/:folder/:tpl', {
              templateUrl: function(attr){
                return 'assets/tpl/' + attr.folder + '/' + attr.tpl + '.html';
              }
            }).when('/:tpl', {
              
              templateUrl: function(attr){
                return 'assets/tpl/' + attr.tpl + '.html';
              }
            });
});

angular.module('plugin.website').controller('TablesDataController', ['$scope', 'PlaceholderTextService', 'ngTableParams', '$filter', function($scope, PlaceholderTextService, ngTableParams, $filter){

    // adding demo data
    var data = [];
    for (var i = 1; i <= 50; i++){
      data.push({
        icon: PlaceholderTextService.createIcon(),
        firstname: PlaceholderTextService.createFirstname(),
        lastname: PlaceholderTextService.createLastname(),
        paragraph: PlaceholderTextService.createSentence()
      });
    }
    $scope.data = data;
  
    $scope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,
      sorting: {
        firstname: 'asc'     // initial sorting
      }
    }, {
      filterDelay: 50,
      total: data.length, // length of data
      getData: function($defer, params) {
        var searchStr = params.filter().search;
        var mydata = [];
  
        if(searchStr){
          mydata = data.filter(function(item){
            return item.firstname.toLowerCase().indexOf(searchStr) > -1 || item.lastname.toLowerCase().indexOf(searchStr) > -1;
          });
        } else {
          mydata = data;
        }
  
        mydata = params.sorting() ? $filter('orderBy')(mydata, params.orderBy()) : mydata;
        $defer.resolve(mydata.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });
  
  
  }]);
  