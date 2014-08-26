"use strict";angular.module("decisionApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ui.sortable","LocalStorageModule","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("decisionApp").controller("MainCtrl",["$scope","localStorageService",function(a,b){a.sortOptions={accept:function(a,b){return a.itemScope.sortableScope.$id===b.$id},containment:".rankStep"},a.columnStep=1,a.columnWeightStep=2,a.rowStep=3,a.matrixStep=4,a.addRow=function(){a.steps[a.matrixStep].data=[];for(var b=0;b<a.steps[a.columnStep].data.length;b+=1)a.steps[a.matrixStep].data.push(a.steps[a.rowStep].data.slice(0))},a.setInitialState=function(c){c&&b.clearAll(),a.step=b.get("step")?Number(b.get("step")):0,a.steps=b.get("steps")?b.get("steps"):[{title:"Define the Problem",description:"Take some time on this one. Oftentimes, a problem is poorly defined or identified as a symptom rather than a root cause.",data:[],multiple:!1,dependent:!1},{title:"Determine Values",description:"Values are different aspects of a problem that influence the final decision. For example, a choice for a job may be influenced by location, wages, culture, commute time, and the others.",data:[],multiple:!0,dependent:!1},{title:"Rank Values",description:"The values may carry different weight as well. Keeping with jobs example, a desire to reduce commute time might be relatively more important than wages, so commute time should be higher in the list.",data:[],multiple:!1,dependent:!0},{title:"Identify Choices",description:"You often have a number of choices at a particular time. Try to identify all of the relevant ones for your problem.",data:[],multiple:!0,dependent:!1},{title:"Rate Each Choice",description:"This can be tough. Take some time to think on which choice best fits a value. For a simple example, if the salary for one job is $35k/year and the salary for another is $60k/year, then the $60k/year job should be at the top of the list.",data:[],multiple:!0,dependent:!0},{title:"Find Optimal Decision",description:"",data:[],dependent:!0,multiple:!0}]},a.previous=function(){a.step-=1,b.set("step",a.step)},a.submitted=!1,a.changed=!1,a.checkBlank=function(b){console.log("check",b),""===a.steps[a.step].data[b]&&(console.log("blank"),a.steps[a.step].data=a.steps[a.step].data.filter(function(a){return""!==a}))},a.getWeight=function(a,b){return a.length-a.indexOf(b)},a.next=function(c){if(!c)return void(a.submitted=!0);if(a.step===a.rowStep&&a.addRow(),a.step===a.matrixStep)for(var d=Array.apply(null,new Array(a.steps[a.rowStep].data.length)).map(Number.prototype.valueOf,0),e=0;e<a.steps[a.rowStep].data.length;e+=1){for(var f=0;f<a.steps[a.columnStep].data.length;f+=1)d[a.steps[a.rowStep].data.indexOf(a.steps[a.matrixStep].data[f][e])]+=a.getWeight(a.steps[a.matrixStep].data[f],a.steps[a.matrixStep].data[f][e])*a.getWeight(a.steps[a.columnStep].data,a.steps[a.columnStep].data[f]);a.steps[a.step+1].data=d}a.step+=1,a.submitted=!1,b.set("steps",a.steps),b.set("step",a.step)},a.setInitialState(!1)}]),angular.module("decisionApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);