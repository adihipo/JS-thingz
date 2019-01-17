'use strict';

const test = require('tape');
const request = require('supertest');
const app = require('../routes');

test('test', (t) => {
  t.equals(2, 1+1);

  t.end();
});

test('groot endpoint message', (t) => {
  request(app)
  .get('/groot/?message=something')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) {
      console.log(err);
    }
    const expectedAnswer = '{"received": "something","translated": "I am Groot!"}';
    t.same(res.body, expectedAnswer, 'Answer OK');
    t.end();
  });
});

test('groot endpoint no message provided', (t) => {
  request(app)
  .get('/groot')
  .expect('Content-Type', /json/)
  .expect(404)
  .end(function(err, res) {
    if (err) {
      console.log(err);
    }
    const expectedAnswer = '{"error": "I am Groot!"}';
    t.same(res.body, expectedAnswer, 'Answer OK');
    t.end();
  });
});