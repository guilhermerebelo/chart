'use strict';

var _ = require('lodash');

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

var MODEL = {
    LIST_LEFT: {
        list: [],
        isSelectAll: false
    },
    LIST_RIGHT: {
        list: [],
        isSelectAll: false
    }
}

var OTHER_TYPE_LIST = {
    LIST_LEFT: 'LIST_RIGHT',
    LIST_RIGHT: 'LIST_LEFT'
}

var DEFAULT_LIST_STARTER = 'LIST_LEFT';

ComponenteModeloController.$inject = [
    'pes-commponente.pes-componente.Service',
    'promiseTracker',
    '$scope',
    'uiSortableMultiSelectionMethods',
    '$element'
];
function ComponenteModeloController(
    Service, 
    promiseTracker, 
    $scope, 
    uiSortableMultiSelectionMethods, 
    $element
) {
    var vm = this;
    vm.loadingTracker = promiseTracker();

    load();

    vm.items = MODEL;

    vm.toggleAll = toggleAll;
    vm.distribute = distribute;
    vm.setCheckboxSelectAll = setCheckboxSelectAll;
    vm.submitSingle = submitSingle;

    console.log(uiSortableMultiSelectionMethods);

    function setCheckboxSelectAll(type) {
        teste();
        var selecionados = [];
        _.forEach(vm.items[type].list, function(item, index) {
            // teste();
            // var el = $element.find('#id-1');
            // var el = $element.find('#id-' + index);
            // el.removeClass('ui-sortable-selected');

            // el.addClass('ui-sortable-selected');
            // if (item.$$selected) {
            //     console.log('item selecionado');
            //     el.addClass('ui-sortable-selected');
            //     selecionados.push(item);
            // }
        });

        // console.log('selecionados');
        // console.log(selecionados);

        /*
        function teste(item, index) {
        var el = $element.find('#id-1');
        var el1 = $element.find('#id-2');
        var el2 = $element.find('#id-3');
        el.addClass('ui-sortable-selected');
        el1.addClass('ui-sortable-selected');
        el2.addClass('ui-sortable-selected');
    }

        function setChangeDraggable(item, index) {
            var items
        };
        */

        // vm.items[type].isSelectAll =
        //     selecionados.length === vm.items[type].list.length;
    }

    function load() {
        Service.get(1).then(onLoad);
    }

    function onLoad(data) {
        vm.items[DEFAULT_LIST_STARTER].list = data;
    }

    function toggleAll(typeList) {
        _.forEach(vm.items[typeList].list, function(item) {
            item.$$selected = vm.items[typeList].isSelectAll;
        })
    }

    function distribute(typeList) {
        var otherTypeList = OTHER_TYPE_LIST[typeList];

        var thisList = [];
        var otherList = [];

        _.forEach(vm.items[typeList].list, function(item) {
            item.$$selected ? otherList.push(item) : thisList.push(item);
            item.$$selected = false;
        })

        setDefaltCheckboxList();

        vm.items[typeList].list = thisList;
        vm.items[otherTypeList].list = vm.items[otherTypeList].list.concat(otherList);
    }

    function setDefaltCheckboxList() {
        vm.items['LIST_LEFT'].isSelectAll = false;
        vm.items['LIST_RIGHT'].isSelectAll = false;
    }

    function submitSingle(item, index, type) {
        var item = vm.items[type].list[index];
        item.$$selected = false;

        vm.items[type].list.splice(index, 1);
        vm.items[OTHER_TYPE_LIST[type]].list.push(item);
    }


    // /*lógica do sortable*/
    // vm.sortableList = {
    //     // 'ui-floating': true,
    //     // dropOnEmpty: true,
    //     // items: '>*:not(.sort-disabled)',

    //     handle: '>* .myHandle',
    //     connectWith: ".apps-container"
    // };

    vm.sortableList = uiSortableMultiSelectionMethods.extendOptions({
        // handle: '>* .myHandle',
        // multiSelectOnClick: true
        connectWith: ".apps-container",
        'ui-selection-count': true
    });

    // $scope.sortableOptions = uiSortableMultiSelectionMethods.extendOptions({
    //     stop: function (e, ui) {
    //         // this callback has the changed model
    //         var logEntry = tmpList.map(function (i) {
    //             return i.value;
    //         }).join(', ');
    //         $scope.sortingLog.push('Stop: ' + logEntry);
    //     },
    //     'ui-selection-count': true
    // });


    //ele se baseia pela classe do item
    vm.teste = teste;

    function teste() {
        var el = $element.find('#id-1');
        var el1 = $element.find('#id-2');
        var el2 = $element.find('#id-3');
        el.addClass('ui-sortable-selected');
        el1.addClass('ui-sortable-selected');
        el2.addClass('ui-sortable-selected');
    }

    /*
    - o que fazer
    adicionar o tbody e lincar as listas;
    



    */
}
