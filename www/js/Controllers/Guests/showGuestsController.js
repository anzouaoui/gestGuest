app.controller('ShowGuestsController',
    function ($scope, $stateParams, $ionicPlatform, $cordovaSQLite, $state, DataServiceGuests) {
        $scope.guests = [];
        $scope.currentIdEvent = $stateParams.idEvent;

        /**
         * Function to fetch all rows
         */
        DataServiceGuests.fetchByIdEvent($stateParams.idEvent, function (data) {
            $scope.guests = data;
        });

        /**
         * Function to refresh the page
         */
        $scope.doRefresh = function () {
            DataServiceGuests.fetchByIdEvent($stateParams.idEvent, function (data) {
                $scope.guests = data;
            });
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.goToUpdateGuest = function (id,firstName, lastName, email, confirmed, idEvent) {
            $state.go('updateGuest',
                {
                    id: id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    confirmed: confirmed,
                    idEvent: idEvent
                }
            )
        };

        /**
         * Function to go to the new guest page
         */
        $scope.goToNewGuest = function(currentIdEvent) {
            $state.go('newGuest',
                {
                    idEvent: currentIdEvent
                }
            )
        }
    });