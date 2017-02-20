app.controller('NewGuestController',
    function ($scope, $stateParams, $ionicPlatform, $cordovaSQLite, $state, ionicToast, DataServiceGuests) {
        $scope.guest = {
            id: '',
            firstName: '',
            lastName: '',
            confirmed: false,
            idEvent: $stateParams.idEvent
        };
        console.log($scope.guest);
        console.log($stateParams.idEvent);
        /**
         * Function to insert an event in the database
         */
        $scope.saveGuest = function () {
            DataServiceGuests.insert($scope.guest)
                .then(onSaveSuccess());
            console.log($scope.guest);
        };

        /**
         * Function sucess
         */
        function onSaveSuccess () {
            $state.go('showGuests')
        }
    });