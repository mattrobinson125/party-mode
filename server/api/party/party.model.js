'use strict';

import mongoose from 'mongoose';

var PartySchema = new mongoose.Schema({
  name: String,
  host: String,
  visibility: String,
  spotify_uri: String,
  zip: Number,
});

module.exports = mongoose.model('Party', PartySchema);
