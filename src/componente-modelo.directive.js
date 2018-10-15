'use strict';

require('../node_modules/d3-selection/src/selection/style.js');
require('../node_modules/billboard.js/dist/billboard.css');

var d3 = require('d3');
var $ = require('jQuery');
var moment = require('moment');
var billboard = require('billboard.js').bb;

module.exports = ComponenteModeloDirective;

ComponenteModeloDirective.$inject = [];

function ComponenteModeloDirective() {
    return {
        restrict: 'E',
        template: require('./componente-modelo.directive.html'),
        scope: {},
        controller: ComponenteModeloController,
        controllerAs: 'vm'
    };
}

ComponenteModeloController.$inject = ['pes-commponente.pes-componente.Service', 'promiseTracker'];
function ComponenteModeloController(Service, promiseTracker) {
    var vm = this;
    vm.loadingTracker = promiseTracker();

    get();

    function get() {
        var promise = Service.get(500).then(setChar);
        vm.loadingTracker.addPromise(promise);
    }

    function setChar(value) {
        var bb = billboard.generate({
            bindto: $('.chart')[0],
            data: {
                x: "month",
                columns: [['month', 1, 2, 3, 4, 5, 6, 7], ['folha', 30, 35, 34, 40, 80, 64, 50]]
            },
            grid: {
                y: {
                    show: true
                }
            },
            point: {
                type: "rectangle"
            },
            legend: {
                usePoint: true
            },
            tooltip: {
                format: {
                    title: function (d) {
                        return moment().month(d).format('MMM');
                    },
                    value: function (value, ratio, id) {
                        var format = d3.format(",.2f");
                        return format(value);
                    }
                }
            },
            axis: {
                y: {
                    tick: {
                        format: function (x) {
                            return "R$ " + d3.format(",.2f")(x);
                        }
                    }
                },
                x: {
                    tick: {
                        format: function (x) {
                            return moment().month(x).format('MMM');
                        }
                    }
                    
                }
            },
        })

        bb.resize({ height: 450, width: 600 })
    }
}
