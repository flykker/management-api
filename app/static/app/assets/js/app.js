/*jslint strict: true */

var app = angular.module("app", [
  "app.constants",

  "ngRoute",
  "ngAnimate",
  "ngSanitize",
  "ngPlaceholders",
  "ngTable",

  "angular-loading-bar",
  "ui.select",

  "monospaced.elastic", // resizable textarea
  "mgcrea.ngStrap",
  "jcs-autoValidate",
  "ngFileUpload",
  "textAngular",
  "fsm", // sticky header
  "smoothScroll",
  "LocalStorageModule"
]);

$script("/modules/modules.js", "modules", function() {
  for (var i in modules) {
    module = modules[i];
    $script("/modules/" + module + "/index.js", module);
  }

  $script.ready(modules, function() {
    angular.element(document).ready(function() {
      angular.bootstrap(document, _.union(["app"], modules));
    });
  });
});
