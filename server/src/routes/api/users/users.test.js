const request = require('supertest');

const app = require('../../../app');

const admin = {
  email: process.env.DEFAULT_ADMIN_EMAIL,
  password: process.env.DEFAULT_ADMIN_PASSWORD,
};


describe('Test Admin routes', () => {
  it('should not be able to login', (done) => {
    request(app)
      .post('/auth/login')
      .expect(500, done);
  });

  it('should not be able to get users route a known user with no admin priv', () => {
    const user = {
      email: 'youssef@email.com',
      password: 'password',
    };

    request(app)
      .post('/auth/login')
      .send(user)
      .expect(200)
      .then((response) => {
        request(app)
          .get('/api/v1/users')
          .set('Authorization', `Bearer ${response.token}`)
          .expect(500)
          .expect.to.equal('unauthorized.');
      });
  });
  it('should be able to get all users route a known user with admin priv', () => {
    request(app)
      .post('/auth/login')
      .send(admin)
      .expect(200)
      .then((response) => {
        request(app)
          .get('/api/v1/users')
          .set('Authorization', `Bearer ${response.token}`)
          .expect(200)
          .expect.to.equal([]);
      });
  });
});
