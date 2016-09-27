'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './partyDetailView.routes';

export class PartyDetailViewComponent {
  /*@ngInject*/
  constructor($http, $routeParams, $scope) {
    this.$scope = $scope;
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.partyId = $routeParams.partyId;
  }

  $onInit(){
    this.$http.get('/api/parties/' + this.partyId)
      .then(response => {
        this.party = response.data;
      });
  }
}

export default angular.module('partyModeApp.partyDetailView', [ngRoute])
  .config(routes)
  .component('partyDetailView', {
    template: require('./partyDetailView.html'),
    controller: ['$http', '$routeParams', '$scope', PartyDetailViewComponent],
    controllerAs: 'partyDetailViewCtrl'
  })
  .name;
