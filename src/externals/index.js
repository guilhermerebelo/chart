var angular = require('angular');

require('./style.css');

module.exports = angular
    .module('promise-tracker', [])
    .directive('loading', function () {
        return {
            restrict: 'A',
            template: '<div class="background"><div class="loader" ng-if="loading.active()"></div></div>',
            scope: {
                loading: '='
            }
        }
    }).name;
