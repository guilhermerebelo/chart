var angular = require('angular');

require('./componente-modelo.css');
require('angular-promise-tracker');
require('angular-drag-and-drop-lists');

module.exports = angular
    .module('pes-components.pes-componente-modelo', [
        require('./externals/index'),
        'ajoslin.promise-tracker',
        'dndLists'
    ])
    .factory('pes-commponente.pes-componente.Service', require('./service'))
    .directive('componenteModelo', require('./componente-modelo.directive')).name;
