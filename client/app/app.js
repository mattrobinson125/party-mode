'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

const ngRoute = require('angular-route');

import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';


import {
  routeConfig
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import party from './party/party.component';
import partyDetailView from './partyDetailView/partyDetailView.component';
import partyCreate from './partyCreate/partyCreate.component';

import './app.scss';

angular.module('partyModeApp', [ngCookies, ngResource, ngSanitize, ngRoute, uiBootstrap, navbar,
    footer, main, party, partyDetailView, partyCreate, constants, util
  ])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['partyModeApp'], {
      strictDi: true
    });
  });