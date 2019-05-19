'use strict'

var DATA = [
    {
        cidade: "Criciúma",
        estado: "Santa Catarina",
        pais: "Brasil"
    },
    {
        cidade: "Tubarão",
        estado: "Santa Catarina",
        pais: "Brasil"
    },
    {
        cidade: "Laguna",
        estado: "Santa Catarina",
        pais: "Brasil"
    },
    {
        cidade: "Florinópolis",
        estado: "Santa Catarina",
        pais: "Brasil"
    },
    {
        cidade: "Joiville",
        estado: "Santa Catarina",
        pais: "Brasil"
    },
    {
        cidade: "Chapecó",
        estado: "Santa Catarina",
        pais: "Brasil"
    },
    {
        cidade: "New york",
        estado: "New York",
        pais: "Estados Unidos da américa"
    },
    {
        cidade: "Porto Alegre",
        estado: "Rio Grande do Sul",
        pais: "Brasil"
    }
];

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