'use strict';

import angular from 'angular';

export default angular.module('partyModeApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
