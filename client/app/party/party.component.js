'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './party.routes';

export class PartyComponent {
  /*@ngInject*/
  constructor($http, $scope, $window) {
    this.$http = $http;
    this.$scope = $scope;
    this.$window = $window;
    this.message = 'Hello';
  }

  $onInit() {
    this.$http.get('/api/parties')
      .then(response => {
        this.parties = response.data;
      });
  }

  goTo(index){
    this.$window.location.href = '/party/id/' + this.parties[index]._id;
  }
}

export default angular.module('partyModeApp.party', [ngRoute])
  .config(routes)
  .component('party', {
    template: require('./party.html'),
    controller: ['$http', '$scope', '$window', PartyComponent],
    controllerAs: 'partyCtrl'
  })
  .name;
