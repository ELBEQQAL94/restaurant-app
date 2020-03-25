const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app');

describe('GET /auth', () => {
  it('should respond with a message', async () => {
    const response = await request(app)
      .get('/auth')
      .expect(200);
    expect(response.body.message).to.equal('hello, auth route');
  });
});

describe('POST /auth/signup', () => {
  it('should require an email', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({})
      .expect(500);
    expect(response.body.message).to.equal('"email" is required');
  });
  it('should require a username', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({ email: 'jamal@gmail.com' })
      .expect(500);
    expect(response.body.message).to.equal('"username" is required');
  });
  it('should require a password', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({ email: 'jamal@gmail.com', username: 'jamal' })
      .expect(500);
    expect(response.body.message).to.equal('"password" is required');
  });
  it('should create a new user', () => {
    const newUser = {
      username: 'safad',
      email: 'safad@gmail.com',
      password: 'password',
    };
    request(app)
      .post('/auth/signup')
      .send(newUser)
      .expect(200)
      .then((response) => {
        expect(response.body).to.equal({});
      });
  });
  it('should not allow a user with existing email', () => {
    const newUser = {
      username: 'safad',
      email: 'safad@gmail.com',
      password: 'password',
    };
    request(app)
      .post('/auth/signup')
      .send(newUser)
      .expect(500)
      .then((response) => {
        expect(response.body).to.equal('That email is unique, please shoose another one.');
      });
  });
});


describe('POST /auth/login', () => {
  it('should require an email', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({})
      .expect(500);
    expect(response.body.message).to.equal('"email" is required');
  });
  it('should require a password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'jamal@gmail.com' })
      .expect(500);
    expect(response.body.message).to.equal('"password" is required');
  });
  it('should only allow valid users to login', () => {
    const user = {
      email: 'kamal@gmail.com',
      password: 'password',
    };
    request(app)
      .post('/auth/login')
      .send(user)
      .expect(200)
      .then((response) => {
        expect(response.body).to.equal('Unable to login.');
      });
  });
  it('should login a user', () => {
    const newUser = {
      email: 'safad@gmail.com',
      password: 'password',
    };
    request(app)
      .post('/auth/login')
      .send(newUser)
      .expect(200)
      .then((response) => {
        expect(response.body).to.equal({});
      });
  });
});
