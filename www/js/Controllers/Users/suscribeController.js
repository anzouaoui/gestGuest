app.controller('SuscribeController',
    function ($scope, $stateParams, $ionicPlatform, $cordovaSQLite, $state, $filter, $ionicPopup, DataServicesUsers) {
        var user = $scope.user = {};
        var passwords = [];
        console.log($scope);
        console.log(user);

        /**
         * Function to insert an user in the database
         */
        $scope.saveUser = function () {
            DataServicesUsers.fetchPasswords(function (data) {
                passwords = data;
                console.log(passwords);
                if (passwords.length == 0) {
                    console.log("Le tableau est vide");
                    if (user.name != undefined) {
                        if (user.email != undefined) {
                            if (user.password != undefined) {
                                DataServicesUsers.insert($scope.user)
                                    .then(onSaveSuccess());
                            } else {
                                var alertPopup1 = $ionicPopup.alert(
                                    {
                                        title: 'Champs obligatoires',
                                        template: 'Veuillez renseigner tous les champs'
                                    });
                                alertPopup1.then(function (res) {
                                    user.password = undefined;
                                    user.email = undefined;
                                    user.name = undefined;
                                })
                            }
                        } else {
                            var alertPopup2 = $ionicPopup.alert(
                                {
                                    title: 'Champs obligatoires',
                                    template: 'Veuillez renseigner tous les champs'
                                });
                            alertPopup2.then(function (res) {
                                user.password = undefined;
                                user.email = undefined;
                                user.name = undefined;
                            })
                        }

                    } else {
                        var alertPopup = $ionicPopup.alert(
                            {
                                title: 'Champs obligatoires',
                                template: 'Veuillez renseigner tous les champs'
                            }
                        );
                        alertPopup.then(function (res) {
                            user.password = undefined;
                            user.email = undefined;
                            user.name = undefined;
                        })
                    }
                } else {
                    console.log("Le tableau n'est pas vide");
                    passwords.forEach(function (password) {
                        console.log(password.password);

                        if (password.password == user.password) {
                            var alertPopupPassword = $ionicPopup.alert(
                                {
                                    title: 'Mot de passe utilisé',
                                    template: 'Ce mot de passe est déjà utilisé\nVeuillez saisir un nouveau mot de passe'
                                }
                            );
                            alertPopupPassword.then(function (res) {
                            });
                        } else {
                            console.log("bon mot de passe");
                            console.log(password);
                            console.log(user.password);
                            if (user.name != undefined) {
                                if (user.email != undefined) {
                                    if (user.password != undefined) {
                                        DataServicesUsers.insert($scope.user)
                                            .then(onSaveSuccess());
                                    } else {
                                        var alertPopup1 = $ionicPopup.alert(
                                            {
                                                title: 'Champs obligatoires',
                                                template: 'Veuillez renseigner tous les champs'
                                            });
                                        alertPopup1.then(function (res) {
                                            user.password = undefined;
                                            user.email = undefined;
                                            user.name = undefined;
                                        })
                                    }
                                } else {
                                    var alertPopup2 = $ionicPopup.alert(
                                        {
                                            title: 'Champs obligatoires',
                                            template: 'Veuillez renseigner tous les champs'
                                        });
                                    alertPopup2.then(function (res) {
                                        user.password = undefined;
                                        user.email = undefined;
                                        user.name = undefined;
                                    })
                                }

                            } else {
                                var alertPopup = $ionicPopup.alert(
                                    {
                                        title: 'Champs obligatoires',
                                        template: 'Veuillez renseigner tous les champs'
                                    }
                                );
                                alertPopup.then(function (res) {
                                    user.password = undefined;
                                    user.email = undefined;
                                    user.name = undefined;
                                })
                            }
                        }
                    });
                }
            });
        };

        /**
         * Function sucess
         */
        function onSaveSuccess() {
            $state.go('login')
        }
    });