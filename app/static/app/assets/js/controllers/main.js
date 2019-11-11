app.controller('MainController',
  ['$scope', '$animate', 'localStorageService', '$alert', '$timeout',
  function($scope, $animate, localStorageService, $alert, $timeout){

  $scope.modules = window.modules;

  if (typeof(browser_old) == "undefined"){
    initRipplesWithArrive();

    $(document).arrive('.navbar-toggle', function() {
      $(this).sideNav({menuWidth: 260, closeOnClick: true});
    });
  }

  $scope.theme_colors = [
    'pink','red','purple','indigo','blue',
    'light-blue','cyan','teal','green','light-green',
    'lime','yellow','amber','orange','deep-orange'
  ];

  // Add todoService to scope
  
  $scope.fillinContent = function(){
    $scope.htmlContent = 'content content';
  };

  // theme changing
  $scope.changeColorTheme = function(cls){
    $scope.theme.color = cls;
  };

  $scope.changeTemplateTheme = function(cls){
    $scope.theme.template = cls;
  };

  if ( !localStorageService.get('theme') ) {
    theme = {
      color: 'theme-pink',
      template: 'theme-template-dark'
    };
    localStorageService.set('theme', theme);
  }
  localStorageService.bind($scope, 'theme');

  var introductionAlert = $alert({
    title: 'Welcome to Materialism',
    content: 'Stay a while and listen',
    placement: 'top',
    type: 'theme',
    show: false,
    template: 'assets/tpl/partials/alert-introduction.html',
    animation: 'mat-grow-top-right'
  });

  if(!localStorageService.get('alert-introduction')) {
    $timeout(function(){
      $scope.showIntroduction();
      localStorageService.set('alert-introduction', 1);
    }, 1750);
  }

  $scope.showIntroduction = function(){
    introductionAlert.show();
  };




}]);
