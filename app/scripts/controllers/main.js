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

            {'title': 'Define the Problem', 'description': 'Take some time on this one. Oftentimes, a problem is poorly defined or identified as a symptom rather than the root cause.', 'data': [], 'multiple': false, 'dependent': false}, 
            {'title': 'Determine Values', 'description': 'Values are different aspects of a problem that influence the final decision. For example, a choice for a job may be influenced by location, wages, culture, and the others.', 'data': [], 'multiple': true, 'dependent': false}, 
            {'title': 'Weight Importance of Values', 'description': 'The values may carry different weight as well. Keeping with jobs example, a desire to reduce commute time might be relatively more important than wages. You can use whatever scale you want (i.e. 1-100), but just note that higher numbers indicate that you prefer the value more.', 'data': [], 'multiple': false, 'dependent': true}, 
            {'title': 'Identify Choices', 'description': 'You often have a number of choices at a particular time. Try to identify all of the relevant ones for your problem.', 'data': [], 'multiple': true, 'dependent': false}, 
            {'title': 'Rate Each Choice', 'description': 'This can be tough. Take determine how you would rate each choice for each particular value. Again, you can use whatever scale you want (i.e. 1-100), but just note that higher numbers indicate that you prefer the value more.', 'data': [], 'multiple': true, 'dependent': true}, 
            {'title': 'Find Optimal Decision', 'description': '', 'data': [], 'dependent': true, 'multiple': true}

      ]; 

      $scope.previous = function() {
          // clear out data from current step
          $scope.steps[$scope.step].data = [];

          $scope.step -= 1;
      };

      $scope.submitted = false;

      $scope.next = function(isValid) {
          if (!isValid) {
            $scope.submitted = true;
            return;
          }
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

          // update the data
          $scope.step += 1;
          $scope.submitted = false;
      };


  });
