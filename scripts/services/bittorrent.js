'use strict';

angular.module('torrentApp').service('$bittorrent', ['$rootScope', '$injector', 'clients', 'configService', function($rootScope, $injector, $clients, config){
    console.log("Config", config.getServer());

    this.getClient = function(clientName) {
        if (clientName) {
            return fetchClientManual(clientName);
        } else {
            return fetchClientAuto();
        }
    }

    function fetchClientAuto() {
        var client = config.getServer().type;
        return fetchClientManual(client);
    }

    function fetchClientManual(name) {
        var client = $clients[name];

        if (client){
            var service = $injector.get(client.service);
            $rootScope.$btclient = service;
            console.log("Changed client to:", client.name);
            return service;
        } else {
            throw new Error('Bittorrent client "' + client + '" not available')
        }
    }
}]);