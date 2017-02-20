app.controller('DeleteGuestController',
    function ($scope, $stateParams, $ionicPlatform, $state, $ionicPopup, ionicToast, DataServiceGuests) {
        $scope.confirmDelete = function (id, index) {
            var confirmDeletePopup = $ionicPopup.confirm(
                {
                    title: 'Supprimer un invité',
                    template: 'Etes-vous sûr de vouloir supprimer cet invité ?'
                });
            confirmDeletePopup.then(function (res) {
                if (res) {
                    DataServiceGuests.delete(id);
                    ionicToast.show('invité supprimé', 'bottom', false, 2500);
                    $scope.guests.splice(index, 1);
                }
            }).then(onSaveSuccess());
        };

        /**
         * Function sucess
         */
        function onSaveSuccess() {
            $state.go('showGuests')
        }
    });