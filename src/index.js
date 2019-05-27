var angular = require('angular');

require('./componente-modelo.css');
require('angular-promise-tracker');
require('angular-ui-sortable');
require('angular-ui-sortable-multiselection')

module.exports = angular
    .module('pes-components.pes-componente-modelo', [
        require('./externals/index'),
        'ajoslin.promise-tracker',
        'ui.sortable',
        'ui.sortable.multiselection'
    ])
    .factory('pes-commponente.pes-componente.Service', require('./service'))
    .directive('pesSortable', require('./pes-sortable.directive.js'))
    .directive('componenteModelo', require('./componente-modelo.directive')).name;
