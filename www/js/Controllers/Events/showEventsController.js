app.controller('ShowEventsController',
    function ($scope, $stateParams, $ionicPopup, $state, ionicToast, DataServiceEvents, DataServiceGuests) {
        $scope.fetchId = function (id) {
            $state.go('showEvents',
                {
                    id: id
                }
            )
        };

        $scope.events = [];

        DataServiceEvents.fetchAll(function (data) {
            $scope.events = data;
        });
        console.log($stateParams);
        $scope.guests = DataServiceGuests.fetchByGuests($stateParams);
        console.log($scope.guests);

        /**
         * Go to the edit page
         * @param id
         * @param name
         * @param date
         * @param hour
         * @param place
         */
        $scope.goToShowEvent = function (id,name, date, hour, place) {
            $state.go('updateEvent',
                {
                    id: id,
                    name: name,
                    date: date,
                    hour: hour,
                    place: place
                }
            )
        };

        /**
         * Function to go to the new guest page
         * @param id
         */
        $scope.goToShowGuests = function (id) {
            $state.go('showGuests',
                {
                    idEvent: id
                }
            )
        };

        /**
         * Function to refresh the page
         */
        $scope.doRefresh = function () {
            DataServiceEvents.fetchAll(function (data) {
                $scope.events = data;
            });
            $scope.$broadcast('scroll.refreshComplete');
        };
    });