app.controller('LoginController',
    function ($scope, $stateParams, $ionicPlatform, $cordovaSQLite, $state,$ionicPopup, DataServiceEvents, DataServicesUsers) {
        var currentUser = $scope.user = {
            email: '',
            password: ''
        };


        $scope.goToEvents = function () {
            DataServicesUsers.connection(currentUser.email, currentUser.password, function (data) {
                currentUser = data;
                if(currentUser.length == 1) {
                    $state.go('home')
                        .then(function (res) {
                            var alertPopup = $ionicPopup.alert(
                                {
                                    title: 'Connexion réussie',
                                    template: 'Bienvenue dans votre espace'
                                }
                            );
                            alertPopup.then(function (res) {
                            });
                        });
                    }else {
                    var alertPopup = $ionicPopup.alert(
                        {
                            title: 'Compte inexistant' ,
                            template: 'cet utilisateur n\'existe pas'
                        }
                    );
                    alertPopup.then(function (res) {
                    });
                }
            });

            console.log(currentUser)
        }
    });