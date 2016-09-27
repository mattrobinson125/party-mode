'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './partyCreate.routes';

export class PartyCreateComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('partyModeApp.partyCreate', [ngRoute])
  .config(routes)
  .component('partyCreate', {
    template: require('./partyCreate.html'),
    controller: PartyCreateComponent,
    controllerAs: 'partyCreateCtrl'
  })
  .name;
