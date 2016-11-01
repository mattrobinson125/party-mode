'use strict';

import mongoose from 'mongoose';

var PartySchema = new mongoose.Schema({
  name: String,
  host: String,
  visibility: String,
  playlist_uri: String,
  owner_uri: String,
  zip: Number,
});

module.exports = mongoose.model('Party', PartySchema);
