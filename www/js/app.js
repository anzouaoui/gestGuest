// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in servicesEvents.js
// 'starter.controllers' is found in newEventController.js
var app = angular.module('starter', ['ionic', 'ngCordova', 'ionic-toast', 'ionic-datepicker', 'ionic-timepicker'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'templates/home.html'
        });
        $stateProvider.state('newEvent', {
            url: '/newEvent',
            templateUrl: 'templates/Events/newEvent.html',
            controller: 'NewEventController'
        });
        $stateProvider.state('showEvents', {
            url: '/Events',
            templateUrl: 'templates/Events/showEvents.html',
            controller: 'ShowEventsController'
        });
        $stateProvider.state('deleteEvent', {
            url: '/deleteEvent',
            templateUrl: 'templates/Events/showEvents.html',
            controller: 'DeleteEventController'
        });
        $stateProvider.state('updateEvent', {
            url: '/updateEvent',
            templateUrl: 'templates/Events/updateEvent.html',
            controller: 'UpdateEventController',
            params: {
                id: null,
                name: null,
                date: null,
                hour: null,
                place: null
            }
        });
        $stateProvider.state('newGuest', {
            url: '/newGuest',
            templateUrl: 'templates/Guests/newGuest.html',
            controller: 'NewGuestController',
            params: {
                idEvent: null
            }
        });
        $stateProvider.state('showGuests', {
            url: '/showGuests',
            templateUrl: 'templates/Guests/showGuests.html',
            controller: 'ShowGuestsController',
            params: {
                idEvent: null
            }
        });
        $stateProvider.state('deleteGuest', {
            url: '/deleteGuest',
            templateUrl: 'templates/Events/showEvents.html',
            controller: 'DeleteGuestController'
        });
        $stateProvider.state('updateGuest', {
            url: '/updateGuest',
            templateUrl: 'templates/Events/updateGuest.html',
            controller: 'UpdateGuestController',
            params: {
                id: null,
                name: null,
                date: null,
                hour: null,
                place: null
            }
        });

        $urlRouterProvider.otherwise('/');

    })

    .config(function (ionicDatePickerProvider) {
        var datePickerObject = {
            inputDate: new Date(),
            titleLabel: 'Choisir une date',
            setLabel: 'Enregistrer',
            setButtonType: 'button-positive',
            todayLabel: 'Date du jour',
            todayButtonType: 'button-positive',
            closeLabel: 'Fermer',
            closeButtonType: 'button-positive',
            mondayFirst: true,
            weeksList: ["L", "Ma", "Me", "J", "V", "S", "D"],
            monthsList: ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"],
            templateType: 'popup',
            from: new Date(2017, 1, 1),
            to: new Date(2026, 12, 31),
            showTodayButton: true,
            closeOnSelect: true
        };
        ionicDatePickerProvider.configDatePicker(datePickerObject);
    })

    .config(function (ionicTimePickerProvider) {
        var timePickerObject = {
            inputTime: (((new Date()).getHours() * 60 * 60) + (new Date().getMinutes() * 60)),
            format: 24,
            step: 1,
            setLabel: 'Enregistrer',
            closeLabel: 'Fermer'
        };
        ionicTimePickerProvider.configTimePicker(timePickerObject);
    });
