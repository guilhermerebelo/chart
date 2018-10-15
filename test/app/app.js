'use strict';

var angular = require('angular');

module.exports = angular
    .module('app', [require('../../src/index')])
    //.config(require('./app.states')) -> Falta resolver a parada do states
    .controller('app.MainController', require('./main.controller')).name;
