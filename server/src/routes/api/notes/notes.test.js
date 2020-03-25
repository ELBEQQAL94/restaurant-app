const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../app');

describe('GET /user/notes', () => {
  it('should get unauthorized. ', async () => {
    const response = await request(app)
      .get('/user/notes')
      .expect(500);
    expect(response.body.message).to.equal('unauthorized.');
  });
  it('should get all notes', async () => {
    request(app)
      .get('/user/notes')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM2ZDk5N2QyYmMwMTFhNzRiODA2ZWYiLCJlbWFpbCI6InlvdXNzZWZAZW1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1ODA4MjAwNzIsImV4cCI6MTU4MDkwNjQ3Mn0.ajbHdpP633WnCXqjQtxeqUMzHCITAMfH5dLzYVEVdrk')
      .expect(200)
      .then((response) => {
        expect(response.body).to.equal([]);
      });
  });
});

describe('POST /user/notes', () => {
  it('should get unauthorized. ', async () => {
    const response = await request(app)
      .post('/user/notes')
      .expect(500);
    expect(response.body.message).to.equal('unauthorized.');
  });
  it('should create new note', async () => {
    request(app)
      .post('/user/notes')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM2ZDk5N2QyYmMwMTFhNzRiODA2ZWYiLCJlbWFpbCI6InlvdXNzZWZAZW1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1ODA4MjAwNzIsImV4cCI6MTU4MDkwNjQ3Mn0.ajbHdpP633WnCXqjQtxeqUMzHCITAMfH5dLzYVEVdrk')
      .expect(200)
      .then((response) => {
        expect(response.body).to.equal({});
      });
  });
});
