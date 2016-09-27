import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http, $window) {
    this.$http = $http;
    this.$window = $window;
  }

  $onInit() {
    this.$http.get('/api/parties')
      .then(response => {
        this.awesomeThings = response.data;
      });
  }

  login(){
    this.$window.location.href = '/login';
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('partyModeApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: ['$http', '$window', MainController]
  })
  .name;
