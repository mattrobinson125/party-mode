/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Party from '../api/party/party.model';

Party.find({}).remove()
  .then(() => {
    Party.create({
      name: 'Cool Party 1',
      host: 'Matt Robinson'
    }, {
      name: 'Weird Party',
      host: 'Austin Flinn'
    });
  });
