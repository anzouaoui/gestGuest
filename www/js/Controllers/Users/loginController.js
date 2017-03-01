app.controller('LoginController',
    function ($scope, $stateParams, $ionicPlatform, $cordovaSQLite, $state, $ionicPopup, $cordovaOauth, $openFB, $facebook) {
        $openFB.init(
            {
                appId: '647541418781098'
            }
        );
        /**
         * Connection with Facebook
         */
        $scope.loginFacebook = function () {

             $cordovaOauth.facebook("647541418781098", ["email"]).then(function (result) {
             $state.go('home');
             var alertConnection = $ionicPopup.alert(
             {
             title: 'Connecté',
             template: 'Bienvenue dans votre espace'
             });
             alertNoConnection.then(function (res) {
             checked = true;
             });

             }, function (error) {
             console.log("Non connecté " + error);
             });

        };

        /**
         * Connection with Google
         */
        $scope.loginGoogle = function () {
            $cordovaOauth.google("749362681855-hu3clrjs2q0dciccdm95ltdkb0qmvg15.apps.googleusercontent.com ", ["email"]).then(function (result) {
                $state.go('home');

                var alertConnection = $ionicPopup.alert(
                    {
                        title: 'Connecté',
                        template: 'Bienvenue dans votre espace'
                    });
                alertNoConnection.then(function (res) {
                    checked = true;
                });
            }, function (error) {
                console.log("Non connecté " + error);
            })

        };

        /**
         * Connection with Twitter
         */
        $scope.loginTwitter = function () {
            $cordovaOauth.twitter("dUhh6xgeqM43cs4IMEhCRO8Z6", "LQU3T8ljLpbiLBYSTHSF0oh56mOnWfmWkkmJHv1Xdg3JSOIqZY").then(function (result) {
                $state.go('home');
                var alertConnection = $ionicPopup.alert(
                    {
                        title: 'Connecté',
                        template: 'Bienvenue dans votre espace'
                    });
                alertNoConnection.then(function (res) {
                    checked = true;
                }, function (error) {
                    console.log("Non connecté " + error);
                });
            })

        }
    });