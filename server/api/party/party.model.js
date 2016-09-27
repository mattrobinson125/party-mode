'use strict';

import mongoose from 'mongoose';

var PartySchema = new mongoose.Schema({
  name: String,
  host: String,
});

module.exports = mongoose.model('Party', PartySchema);
