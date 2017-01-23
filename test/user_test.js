process.env.NODE_ENV = 'test';

const
    assert = require('assert'),
    should = require('should'),
    request = require('supertest'),
    URI = 'http://localhost:3000';


describe('Test User', function () {
    it('Request Find All', function (done) {
        request(URI)
            .get('/v1/users')
            .expect('Content-Type','application/json; charset=utf-8')
            .expect(200,done);
    });
});