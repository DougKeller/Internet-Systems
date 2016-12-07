angular.module('calendar').controller('EventModalController', ['$scope', '$filter', 'event', 'defaultState', 'defaultDate', 'EventFactory', 'NotificationService',
  function($scope, $filter, event, defaultState, defaultDate, EventFactory, NotificationService) {
    $scope.state = defaultState;
    $scope.switchState = (state) => $scope.state = state;

    $scope.pickerConfig = { modelType: 'moment' };

    $scope.title = function() {
      if ($scope.state === 'multiple') {
        return 'View Events';
      }
      if ($scope.state === 'view') {
        return $scope.event.title;
      }
      if (event.isNew()) {
        return 'Create an Event';
      }
      return 'Edit ' + event.title;
    };

    $scope.subtitle = function() {
      if ($scope.state === 'view') {
        var start = $scope.event.startTime ? $scope.event.startTime.format('MMMM D, YYYY h:mm a') : '?';
        var end = $scope.event.endTime ? $scope.event.endTime.format('MMMM D, YYYY h:mm a') : '?';
        return start + ' - ' + end;
      }
    };

    var calculateValues = function(event) {
      var date = moment($scope.form.startDate);
      var time = moment($scope.form.startTime);
      date.set({
        hour: time.hour(),
        minute: time.minute(),
        second: time.second()
      });
      event.startTime = date;

      date = moment($scope.form.endDate);
      time = moment($scope.form.endTime);
      date.set({
        hour: time.hour(),
        minute: time.minute(),
        second: time.second()
      });
      event.endTime = date;

      event.recurringDays = 0;
      if ($scope.form.recurring) {
        if ($scope.form.recurringStart) {
          event.recurringStart = moment($scope.form.recurringStart);
        }
        if ($scope.form.recurringEnd) {
          event.recurringEnd = moment($scope.form.recurringEnd);
        }

        for (var i in $scope.recurringDays) {
          if ($scope.recurringDays[i]) {
            event.recurringDays = event.recurringDays | Math.pow(2, i);
          }
        }
      }
    };

    $scope.save = function() {
      calculateValues($scope.event);

      $scope.event.save().then(function() {
        NotificationService.success($scope.event.title, 'was saved.');
        $scope.$close();
      }, function() {
        NotificationService.error();
      });
    };

    $scope.view = function(viewedEvent) {
      $scope.event = viewedEvent;
      $scope.originalEvent = angular.copy(viewedEvent);
      $scope.switchState('view');
    };

    var initializeDefaults = function(event) {
      $scope.form = {
        recurring: angular.isDefined(event.recurringStart || event.recurringEnd),
        recurringStart: moment(event.recurringStart).toDate(),
        recurringEnd: moment(event.recurringEnd).toDate(),
        startDate: (event.startTime || moment(defaultDate)).clone().toDate(),
        startTime: (event.startTime || moment(defaultDate)).clone().toDate(),
        endDate: (event.endTime || moment(defaultDate)).clone().toDate(),
        endTime: (event.endTime || moment(defaultDate)).clone().toDate()
      };

      $scope.recurringDays = [false, false, false, false, false, false, false];
      for (var i in $scope.recurringDays) {
        var binary = Math.pow(2, i);
        $scope.recurringDays[i] = (event.recurringDays & binary) > 0;
      }
    };

    $scope.edit = function(editedEvent) {
      if (!editedEvent) {
        editedEvent = new EventFactory();
        if (!$scope.events) {
          $scope.events = [$scope.event, editedEvent];
        }
      }
      $scope.event = editedEvent;
      $scope.originalEvent = angular.copy(editedEvent);
      initializeDefaults(editedEvent);
      $scope.switchState('edit');
    };

    $scope.delete = function(deletedEvent) {
      deletedEvent.delete().then(function() {
        if ($scope.events) {
          var matching = $filter('filter')($scope.events, { _id: deletedEvent._id });
          var index = $scope.events.indexOf(matching[0]);
          $scope.events.splice(index, 1);
          $scope.switchState('multiple');
        } else {
          $scope.$close();
        }
      }, function() {
        NotificationService.error(deletedEvent.title, 'could not be deleted.');
      });
    };

    $scope.cancel = function() {
      if ($scope.events) {
        if ($scope.event.isNew()) {
          $scope.events.splice($scope.events.length - 1, 1);
        }
        $scope.switchState('multiple');
      } else if ($scope.event.isNew() || $scope.state === 'view') {
        $scope.$close();
      } else {
        $scope.event = $scope.originalEvent;
        $scope.switchState('view');
      }
    };

    if (Array.isArray(event)) {
      if (event.length === 0) {
        event = new EventFactory();
        $scope.switchState('edit');
      } else if (event.length === 1) {
        event = event[0];
      } else {
        $scope.switchState('multiple');
        $scope.events = event;
        event = event[0];
      }
    }

    $scope.event = angular.copy(event);
    $scope.originalEvent = angular.copy(event);
    initializeDefaults(event);
  }
]);