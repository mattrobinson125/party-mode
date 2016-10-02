'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const ngCookies = require('angular-cookies');


import routes from './partyCreate.routes';

export class PartyCreateComponent {
  /*@ngInject*/
  constructor($http, $cookies, $window) {
    this.$http = $http;
    this.$cookies = $cookies;
    this.$window = $window;
    this.access_token = $cookies.get('access_token');
    this.formData = {};
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
      this.$http.post('/api/parties', {
        host: this.host,
        name: form.name,
        visibility: form.visibility,
        zip: form.zip
      }).then(response => {
          console.log(response);
          this.$window.location.href = '/party/id/' + response.data._id;
        })
    }
  }
}

export default angular.module('partyModeApp.partyCreate', [ngRoute, ngCookies])
  .config(routes)
  .component('partyCreate', {
    template: require('./partyCreate.html'),
    controller: ['$http', '$cookies', '$window', PartyCreateComponent],
    controllerAs: 'partyCreateCtrl'
  })
  .name;
