app.controller('NewEventController',
    function ($scope, $stateParams, $ionicPlatform, $cordovaSQLite, $state, $filter, ionicToast, ionicDatePicker, ionicTimePicker, DataServiceEvents) {
        $scope.event = {};
        /**
         * Variable to inert a date with a datepicker
         * @type {{callback: callback}}
         */
        var datePicker = {
            callback: function (val) {
                var date = new Date(val);
                var collectionMonth = new Array();
                var month;
                collectionMonth[0] = '01';
                collectionMonth[1] = '02';
                collectionMonth[2] = '03';
                collectionMonth[3] = '04';
                collectionMonth[4] = '05';
                collectionMonth[5] = '06';
                collectionMonth[6] = '07';
                collectionMonth[7] = '08';
                collectionMonth[8] = '09';
                collectionMonth[9] = '10';
                collectionMonth[10] = '11';
                collectionMonth[11] = '12';
                month = collectionMonth[date.getMonth()];
                $scope.event.date = date.getDate() + '/' + month + '/' + date.getFullYear();
                console.log(date.getMonth());

            }
        };

        /**
         *Variable to inert a time with a timepicker
         * @type {{callback: callback}}
         */
        var timePicker = {
            callback: function (val) {
                var hour = new Date(val * 1000);
                var minutes;
                if (hour.getUTCMinutes().toString().length == 1) {
                    minutes = '0' + hour.getUTCMinutes();
                } else {
                    minutes = hour.getUTCMinutes();
                }
                $scope.event.hour = hour.getUTCHours() + 'h' + minutes;
                console.log(minutes);
            }
        };

        /**
         * Function to display a datepicker
         */
        $scope.openDatePicker = function () {
            ionicDatePicker.openDatePicker(datePicker);
        };

        /**
         * Function to display a timepicker
         */
        $scope.openTimePicker = function () {
            ionicTimePicker.openTimePicker(timePicker);
        };

        /**
         * Function to insert an event in the database
         */
        $scope.saveEvent = function () {
            DataServiceEvents.insert($scope.event)
                .then(onSaveSuccess());
            console.log($scope);
        };

        /**
         * Function sucess
         */
        function onSaveSuccess () {
            $state.go('showEvents')
        }
    });
