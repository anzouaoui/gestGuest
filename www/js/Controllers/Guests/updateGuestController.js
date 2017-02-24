app.controller('UpdateGuestController',
    function ($scope, $stateParams, $ionicPlatform, $cordovaSQLite, $state, DataServiceGuests) {
        $scope.guest = {
            id: $stateParams.id,
            firstName: $stateParams.firstName,
            lastName: $stateParams.lastName,
            email: $stateParams.email,
            confirmed: $stateParams.confirmed,
            idEvent: $stateParams.idEvent

        };
        console.log($stateParams);
        console.log($scope.guest);


        /**
         * Function to update an event in the database
         */
        $scope.editGuest = function () {
            DataServiceGuests.update($scope.guest)
                .then(onSaveSuccess());
        };

        /**
         * Function sucess
         */
        function onSaveSuccess() {
            $state.go('showGuests')
        }
    });