'use strict';

var _ = require('lodash');

module.exports = SortableDirective;

SortableDirective.$inject = [];

function SortableDirective() {
    return {
        restrict: 'E',
        template: require('./pes-sortable.directive.html'),
        scope: {},
        controller: SortableController,
        controllerAs: 'vm'
    };
}

SortableController.$inject = ['pes-commponente.pes-componente.Service', '$scope'];
function SortableController(Service, $scope) {
    var vm = this;

    load();

    function load() {
        Service.get(1).then(onload);
    }

    function onload(data) {
        vm.items = data;
    }





    var tmpList = [];

    for (var i = 1; i <= 6; i++) {
        tmpList.push({
            text: 'Item ' + i,
            value: i
        });
    }

    $scope.list = tmpList;


    $scope.sortingLog = [];

    // $scope.sortableOptions = {
    //     activate: function () {
    //         console.log("activate");
    //     },
    //     beforeStop: function () {
    //         console.log("beforeStop");
    //     },
    //     change: function () {
    //         console.log("change");
    //     },
    //     create: function () {
    //         console.log("create");
    //     },
    //     deactivate: function () {
    //         console.log("deactivate");
    //     },
    //     out: function () {
    //         console.log("out");
    //     },
    //     over: function () {
    //         console.log("over");
    //     },
    //     receive: function () {
    //         console.log("receive");
    //     },
    //     remove: function () {
    //         console.log("remove");
    //     },
    //     sort: function () {
    //         console.log("sort");
    //     },
    //     start: function () {
    //         console.log("start");
    //     },
    //     update: function (e, ui) {
    //         console.log("update");

    //         var logEntry = tmpList.map(function (i) {
    //             return i.value;
    //         }).join(', ');
    //         $scope.sortingLog.push('Update: ' + logEntry);
    //     },
    //     stop: function (e, ui) {
    //         console.log("stop");

    //         // this callback has the changed model
    //         var logEntry = tmpList.map(function (i) {
    //             return i.value;
    //         }).join(', ');
    //         $scope.sortingLog.push('Stop: ' + logEntry);
    //     }
    // };
}
