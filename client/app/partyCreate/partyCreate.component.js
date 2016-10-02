'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './partyCreate.routes';

export class PartyCreateComponent {
  /*@ngInject*/
  constructor() {
    this.formData = {}
  }
  processForm(){
    var form = this.formData;
    if(!form.name || !form.visibility || !form.zip){
      console.log("Not complete!");
    } else if(form.zip.length != 5){
      console.log("Zip code incorrect!");
    } else{

    }
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
