/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/parties              ->  index
 * POST    /api/parties              ->  create
 * GET     /api/parties/:id          ->  show
 * PUT     /api/parties/:id          ->  upsert
 * PATCH   /api/parties/:id          ->  patch
 * DELETE  /api/parties/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Party from './party.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Partys
export function index(req, res) {
  return Party.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Party from the DB
export function show(req, res) {
  return Party.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Party in the DB
export function create(req, res) {
  return Party.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Party in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Party.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Party in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Party.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Party from the DB
export function destroy(req, res) {
  return Party.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
