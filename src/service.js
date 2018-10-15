'use strict'

var DATA = ['folha', 30, 35, 34, 40, 80, 64, 50];

module.exports = Service;

Service.$inject = ['$q'];
function Service($q) {
    return {
        get: get
    }

    function get(timeLoading) {
        var defer = $q.defer();

        setTimeout(function () {
            defer.resolve(DATA);
        }, timeLoading || 2000);

        return defer.promise;
    }
}