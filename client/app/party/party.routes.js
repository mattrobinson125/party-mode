'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/party', {
      template: '<party></party>'
    });
}
