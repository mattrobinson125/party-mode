'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/party/id/:partyId', {
      template: '<party-detail-view></party-detail-view>'
    });
}
