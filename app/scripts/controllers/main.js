'use strict';

/**
 * @ngdoc function
 * @name decisionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the decisionApp
 */
angular.module('decisionApp')
  .controller('MainCtrl', function ($scope) {
      $scope.step = 0;

      $scope.columnStep = 1;
      $scope.columnWeightStep = 2;
      $scope.rowStep = 3;
      $scope.matrixStep = 4;

      // XXX such hacks. ng-init was calling the function way too many times. maybe try something else later. for now, whatever.
      $scope.addRow = function() {
        for (var i = 0; i < $scope.steps[$scope.rowStep].data.length; i += 1) {
            $scope.steps[$scope.matrixStep].data.push([]);
        }
      };

      $scope.steps = [

            {'title': 'Define the Problem', 'data': [], 'multiple': false, 'dependent': false, 'type': 'string'}, 
            {'title': 'Determine Criteria', 'data': [], 'multiple': true, 'dependent': false, 'type': 'string'}, 
            {'title': 'Weight Criteria', 'data': [], 'multiple': false, 'dependent': true, 'type': 'number'}, 
            {'title': 'Identify Choices', 'data': [], 'multiple': true, 'dependent': false, 'type': 'string'}, 
            {'title': 'Rate Each Choice', 'data': [], 'multiple': true, 'dependent': true, 'type': 'number'}, 
            {'title': 'Find Optimal Decision', 'data': [], 'dependent': true, 'multiple': true}

      ]; 

      $scope.previous = function() {
          // clear out data from current step
          $scope.steps[$scope.step].data = [];

          $scope.step -= 1;
      };

      $scope.next = function() {
          if ($scope.step === $scope.rowStep) {
            $scope.addRow();
          }
          if ($scope.step === $scope.matrixStep) {
              for (var i = 0; i < $scope.steps[$scope.matrixStep].data.length; i += 1) {
                  var sum = 0;
                  for (var j = 0; j < $scope.steps[$scope.matrixStep].data[i].length; j += 1) {
                    sum +=  $scope.steps[$scope.matrixStep].data[i][j] * $scope.steps[$scope.columnWeightStep].data[j];
                  }
                  console.log(sum);
                  $scope.steps[$scope.step + 1].data.push(sum);
              } 
          }
          // add some validation for the type
          // if (Number(this.stepData)) {
          //     this.input = Number(this.stepData);
          // }

          // if (typeof(this.stepData) === $scope.steps[$scope.step].type) { 
          //     console.log('match'); 
          // }

          // update the data
          $scope.step += 1;


      };


  });
