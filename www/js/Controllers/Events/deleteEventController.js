app.controller('DeleteEventController',
    function ($scope, $stateParams, $ionicPlatform, $state, $ionicPopup, ionicToast, DataServiceEvents) {
        $scope.confirmDelete = function (id, index) {
            var confirmDeletePopup = $ionicPopup.confirm(
                {
                    title: 'Supprimer un événement',
                    template: 'Etes-vous sûr de vouloir supprimer cet événement ?'
                });
            confirmDeletePopup.then(function (res) {
                if (res) {
                    DataServiceEvents.delete(id);
                    ionicToast.show('Evénement supprimé', 'bottom', false, 2500);
                    $scope.events.splice(index, 1);
                }
            }).then(onSaveSuccess());
        };

        /**
         * Function sucess
         */
        function onSaveSuccess() {
            $state.go('showEvents')
        }
    });