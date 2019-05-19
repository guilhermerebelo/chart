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
        controllerAs: 'vm',
        link: function(scope, el, attrs, controller) {

        }
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

ComponenteModeloController.$inject = ['pes-commponente.pes-componente.Service', 'promiseTracker', '$scope'];
function ComponenteModeloController(Service, promiseTracker, $scope) {
    var vm = this;
    vm.loadingTracker = promiseTracker();

    load();

    vm.items = MODEL;

    vm.toggleAll = toggleAll;
    vm.distribute = distribute;
    vm.setCheckboxSelectAll = setCheckboxSelectAll;
    vm.submitSingle = submitSingle;

    function setCheckboxSelectAll(type) {
        var selecionados = _.filter(vm.items[type].list, function(item) {
            return item.$$selected;
        })

        vm.items[type].isSelectAll = 
            selecionados.length === vm.items[type].list.length;
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
        vm.items[otherTypeList].list = vm.items[otherTypeList].list.concat(otherList);54
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


    $scope.getSelectedItemsIncluding = function(list, item) {
        item.selected = true;
        return list.items.filter(function(item) { return item.selected; });
    };
}
