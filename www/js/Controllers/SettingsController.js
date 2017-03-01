app.controller('SettingsController',
    function ($scope, $stateParams, $ionicPlatform, $cordovaSQLite, $state,$ionicPopup, DataServiceEvents, DataServicesUsers) {
        $scope.logout = function () {
            var confirmLogout = $ionicPopup.confirm(
                {
                    title: 'Se déconnecter',
                    template: 'Voulez-vous vramient vous déconnecter?'
                }
            );
            confirmLogout.then(function (res) {
                $state.go('login');
            });
        }
    });