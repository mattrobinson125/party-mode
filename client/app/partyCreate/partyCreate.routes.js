'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/party/create', {
      template: '<party-create></party-create>'
    });
}
