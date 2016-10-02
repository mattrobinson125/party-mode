'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const ngCookies = require('angular-cookies');


import routes from './partyCreate.routes';

export class PartyCreateComponent {
  /*@ngInject*/
  constructor($http, $cookies) {
    this.$http = $http;
    this.$cookies = $cookies;
    this.access_token = $cookies.get('access_token');
  }

  $onInit() {
    var options = {
      headers: { 'Authorization': 'Bearer ' + this.access_token },
      json: true
    };
    this.$http.get('https://api.spotify.com/v1/me', options)
      .then(response => {
        this.host = response.data.display_name;
      });
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

export default angular.module('partyModeApp.partyCreate', [ngRoute, ngCookies])
  .config(routes)
  .component('partyCreate', {
    template: require('./partyCreate.html'),
    controller: ['$http', '$cookies', PartyCreateComponent],
    controllerAs: 'partyCreateCtrl'
  })
  .name;
