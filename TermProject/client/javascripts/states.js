angular.module('calendar').constant('$states', function() {
  function State(name, options, children) {
    this.options = options;
    this.children = children || [];
    this.children.forEach(child => child.parent = this);
    this.name = name;
    this.fullName = () => {
      if (this.parent) {
        return this.parent.fullName() + '.' + name;
      } else {
        return name;
      }
    };
    this.getConfig = () => {
      var config = {
        parent: this.parent ? this.parent.fullName() : undefined
      }
      return angular.extend(config, options);
    };
    this.sref = () => {
      var ref = {};
      ref[this.name] = this.fullName();
      var childrefs = this.children.map(child => child.sref());
      return angular.extend.apply(this, [ref].concat(childrefs));
    };
    this.initialize = ($stateProvider) => {
      $stateProvider.state(this.fullName(), this.getConfig());
      this.children.forEach(child => child.initialize($stateProvider));
    }
  }

  return new State('root',
    {
      abstract: true,
      views: {
        notification: {
          templateUrl: 'notification.html'
        },
        navigation: {
          controller: 'NavigationController',
          templateUrl: 'navigation.html'
        },
        content: {
          template: '<ui-view></ui-view>'
        }
      }
    },
    [
      new State('login',
        {
          url: '/login',
          controller: 'LoginController',
          templateUrl: 'login.html'
        }
      ),
      new State('register',
        {
          url: '/register',
          controller: 'RegisterController',
          templateUrl: 'register.html'
        }
      ),
      new State('authenticated',
        {
          abstract: true,
          template: '<ui-view></ui-view>',
          resolve: {
            currentUser: function(UserFactory, $q, $state, sref) {
              var deferred = $q.defer();

              UserFactory.loadCurrentUser().then(function(user) {
                deferred.resolve(user);
              }, function() {
                $state.go(sref('login'));
                deferred.reject();
              });

              return deferred.promise;
            }
          }
        },
        [
          new State('calendar',
            {
              url: '/calendar?date&period',
              controller: 'CalendarController',
              templateUrl: 'calendar.html'
            }
          )
        ]
      )
    ]
  );
}());