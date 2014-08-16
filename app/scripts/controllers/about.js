'use strict';

/**
 * @ngdoc function
 * @name decisionApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the decisionApp
 */
angular.module('decisionApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
