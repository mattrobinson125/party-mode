'use strict';

var app = require('../..');
import request from 'supertest';

var newParty;

describe('Party API:', function() {
  describe('GET /api/parties', function() {
    var partys;

    beforeEach(function(done) {
      request(app)
        .get('/api/parties')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          partys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      partys.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/parties', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/parties')
        .send({
          name: 'New Party',
          info: 'This is the brand new party!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newParty = res.body;
          done();
        });
    });

    it('should respond with the newly created party', function() {
      newParty.name.should.equal('New Party');
      newParty.info.should.equal('This is the brand new party!!!');
    });
  });

  describe('GET /api/parties/:id', function() {
    var party;

    beforeEach(function(done) {
      request(app)
        .get(`/api/parties/${newParty._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          party = res.body;
          done();
        });
    });

    afterEach(function() {
      party = {};
    });

    it('should respond with the requested party', function() {
      party.name.should.equal('New Party');
      party.info.should.equal('This is the brand new party!!!');
    });
  });

  describe('PUT /api/parties/:id', function() {
    var updatedParty;

    beforeEach(function(done) {
      request(app)
        .put(`/api/parties/${newParty._id}`)
        .send({
          name: 'Updated Party',
          info: 'This is the updated party!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedParty = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedParty = {};
    });

    it('should respond with the original party', function() {
      updatedParty.name.should.equal('New Party');
      updatedParty.info.should.equal('This is the brand new party!!!');
    });

    it('should respond with the updated party on a subsequent GET', function(done) {
      request(app)
        .get(`/api/parties/${newParty._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let party = res.body;

          party.name.should.equal('Updated Party');
          party.info.should.equal('This is the updated party!!!');

          done();
        });
    });
  });

  describe('PATCH /api/parties/:id', function() {
    var patchedParty;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/parties/${newParty._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Party' },
          { op: 'replace', path: '/info', value: 'This is the patched party!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedParty = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedParty = {};
    });

    it('should respond with the patched party', function() {
      patchedParty.name.should.equal('Patched Party');
      patchedParty.info.should.equal('This is the patched party!!!');
    });
  });

  describe('DELETE /api/parties/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/parties/${newParty._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when party does not exist', function(done) {
      request(app)
        .delete(`/api/parties/${newParty._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
