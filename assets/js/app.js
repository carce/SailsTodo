var app = angular.module('app', []);

app.controller('TodoController', function($scope, $http, $timeout, $filter) {
  self = this;
  $scope.shouldShow = false;
  $scope.tasksExist = false;
  $scope.loggedIn = false;

  loadIt();

  $scope.register = function() {
    $http({
      method: 'post',
      url: '/user',
      data: {
        username: $scope.username,
        password: $scope.password
      }
    }).then(function() {
      $scope.logIn();
    }, function() {
      console.log('NECE REGISTRACIJA');
    });
  };

  $scope.logIn = function() {
    $http({
      method: 'post',
      url: '/user/login',
      data: {
        username: $scope.username,
        password: $scope.password
      }
    }).then(function() {
      $scope.loggedIn = true;
      loadIt();
    }, function() {
      console.log('nece log');
    });
  };

  $scope.logOut = function() {
    $http({
      method: 'post',
      url: '/user/logout'
    }).then(function(res){
      $scope.tasks = [];
      $scope.loggedIn = false;
    }, function() {
      console.log('Nece log out');
    });
  };

  $scope.addTask = function() {
    $http({
      method: 'post',
      url: '/task',
      data: {text: $scope.taskText}
    }).then(function(res) {
      $scope.tasks.unshift(res.data);
      $scope.taskText = '';
    }, function() {
      console.log("Opet crklo");
    })
  };

  $scope.updateTask = function(id, isDone) {
    $http({
      method: 'put',
      url: '/task/' + id,
      data: {done: isDone}
    }).then(function() {
      console.log('radi');
    }, function() {
      console.log('sve ti nesto baguje buraz');
    });
  }

  $scope.archive = function () {
    $http({
      method: 'post',
      url: '/task/archive'
    }).then(function () {
      $scope.tasks = $filter('filter')($scope.tasks, {done: false});
    }, function () {
      console.log('Opet nista');
    })
  }

  function loadIt() {
    $http({
      method: 'GET',
      url: '/task?sort="id desc"'
    }).then(function(res) {
      if ($scope.loggedIn != true) $scope.loggedIn = true;
      $scope.tasks = res.data;
      $scope.tasksExist = true;

      for (var i = 0; i < $scope.tasks.length; i++) {
        if ($scope.tasks[i].user.name) $scope.tasks[i].user.username = $scope.tasks[i].user.name;
      }
    }, function() {
      console.log('Fucked up somewhere or logged out');
      $scope.loggedIn = false;
    }).then(function() {
        if (!$scope.shouldShow) {
          $scope.shouldShow = true;
        }
        if ($scope.loggedIn) {
          $timeout.cancel(self.timeout);
          self.timeout = $timeout(loadIt, 5000);
        }
    });
  };
});
