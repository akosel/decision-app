'use strict';

/**
 * @ngdoc function
 * @name decisionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the decisionApp
 */
angular.module('decisionApp')
  .controller('MainCtrl', function ($scope, localStorageService) {
//     localStorageService.clearAll();

      $scope.sortOptions = {
          accept: function(sourceItemHandleScope, destSortableScope) { 
                return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
          },
          containment: '.rankStep'
      };

      $scope.columnStep = 1;
      $scope.columnWeightStep = 2;
      $scope.rowStep = 3;
      $scope.matrixStep = 4;

      // XXX such hacks. ng-init was calling the function way too many times. maybe try something else later. for now, whatever.
      $scope.addRow = function() {
        // if ($scope.steps[$scope.columnStep].data.length !== $scope.steps[$scope.matrixStep].data.length || $scope.steps[$scope.rowStep].data.length !== $scope.steps[$scope.matrixStep].data[0].length) {
            $scope.steps[$scope.matrixStep].data = [];
            for (var i = 0; i < $scope.steps[$scope.columnStep].data.length; i += 1) {
                $scope.steps[$scope.matrixStep].data.push($scope.steps[$scope.rowStep].data.slice(0));
            }
        // }
      };

      $scope.setInitialState = function(reset) {
          if (reset) {
                localStorageService.clearAll();
          }
          $scope.step = localStorageService.get('step') ? Number(localStorageService.get('step')) : 0;
          $scope.steps = localStorageService.get('steps') ? localStorageService.get('steps') : [

                {'title': 'Define the Problem', 'description': 'Take some time on this one. Oftentimes, a problem is poorly defined or identified as a symptom rather than a root cause.', 'data': [], 'multiple': false, 'dependent': false}, 
                {'title': 'Determine Values', 'description': 'Values are different aspects of a problem that influence the final decision. For example, a choice for a job may be influenced by location, wages, culture, commute time, and the others.', 'data': [], 'multiple': true, 'dependent': false}, 
                {'title': 'Weight Importance of Values', 'description': 'The values may carry different weight as well. Keeping with jobs example, a desire to reduce commute time might be relatively more important than wages, so commute time should be higher in the list.', 'data': [], 'multiple': false, 'dependent': true}, 
                {'title': 'Identify Choices', 'description': 'You often have a number of choices at a particular time. Try to identify all of the relevant ones for your problem.', 'data': [], 'multiple': true, 'dependent': false}, 
                {'title': 'Rate Each Choice', 'description': 'This can be tough. Take some time to think on which choice best fits a value. For a simple example, if the salary for one job is $35k/year and the salary for another is $60k/year, then the $60k/year job should be at the top of the list.', 'data': [], 'multiple': true, 'dependent': true}, 
                {'title': 'Find Optimal Decision', 'description': '', 'data': [], 'dependent': true, 'multiple': true}

          ]; 
      };
      

      $scope.previous = function() {
          // clear out data from current step

          $scope.step -= 1;
          localStorageService.set('step', $scope.step);
      };

      $scope.submitted = false;
      $scope.changed = false;

      $scope.getWeight = function(array, item) {
         return array.length - array.indexOf(item); 
      };

      $scope.next = function(isValid) {
          if (!isValid) {
            $scope.submitted = true;
            return;
          }
          if ($scope.step === $scope.rowStep) {
            $scope.addRow();
          }

          if ($scope.step === $scope.matrixStep) {
              var totals = Array.apply(null, new Array($scope.steps[$scope.rowStep].data.length)).map(Number.prototype.valueOf,0);
              for (var i = 0; i < $scope.steps[$scope.rowStep].data.length; i += 1) {
                  for (var j = 0; j < $scope.steps[$scope.columnStep].data.length; j += 1) {
                    totals[$scope.steps[$scope.rowStep].data.indexOf($scope.steps[$scope.matrixStep].data[j][i])] +=  $scope.getWeight($scope.steps[$scope.matrixStep].data[j], $scope.steps[$scope.matrixStep].data[j][i]) * $scope.getWeight($scope.steps[$scope.columnStep].data, $scope.steps[$scope.columnStep].data[j]);
                  }
                  $scope.steps[$scope.step + 1].data = totals;
              } 
          }

          // update the data
          $scope.step += 1;
          $scope.submitted = false;
          localStorageService.set('steps', $scope.steps);
          localStorageService.set('step', $scope.step);

      };

      $scope.setInitialState(false);


  });
