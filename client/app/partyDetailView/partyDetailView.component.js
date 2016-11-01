'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const ngCookies = require('angular-cookies');


import routes from './partyDetailView.routes';

export class PartyDetailViewComponent {
  /*@ngInject*/
  constructor($http, $routeParams, $scope, $cookies) {
    this.$scope = $scope;
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.$cookies = $cookies;
    this.access_token = $cookies.get('access_token');
    this.partyId = $routeParams.partyId;
  }

  $onInit(){
    var playlistUrl = '';
    var options = {
      headers: { 'Authorization': 'Bearer ' + this.access_token },
      json: true
    };
    this.$http.get('/api/parties/' + this.partyId).then(response => {
        this.party = response.data;
        playlistUrl = 'https://api.spotify.com/v1/users/' + this.party.owner_uri
          + '/playlists/' + this.party.playlist_uri + '/tracks';
        this.$http.get(playlistUrl, options).then(response => {
            console.log(response.data);
            this.tracks = response.data.items;
        });
    });

  }
}

export default angular.module('partyModeApp.partyDetailView', [ngRoute, ngCookies])
  .config(routes)
  .component('partyDetailView', {
    template: require('./partyDetailView.html'),
    controller: ['$http', '$routeParams', '$scope', '$cookies', PartyDetailViewComponent],
    controllerAs: 'partyDetailViewCtrl'
  })
  .name;
