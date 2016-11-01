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
        console.log(response.data);
        this.$cookies.put('user_id', response.data.id);
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
      var user_id = this.$cookies.get('user_id');
      var options = {
        headers: { 'Authorization': 'Bearer ' + this.access_token },
        name: form.name,
        json: true
      };
      this.$http.post('https://api.spotify.com/v1/users/' + user_id + '/playlists', {
        name: form.name
      }, {
        headers: { 'Authorization': 'Bearer ' + this.access_token },
        json: true,
      }).then(response => {
        console.log(response);
          this.$http.post('/api/parties', {
            host: this.host,
            name: form.name,
            visibility: form.visibility,
            zip: form.zip,
            playlist_uri: response.data.id,
            owner_uri: response.data.owner.id
          }).then(response => {
              console.log(response);
              this.$window.location.href = '/party/id/' + response.data._id;
          });
      });
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
