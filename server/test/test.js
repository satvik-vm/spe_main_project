import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import User from '../models/User.js';
// import express from "express";

// const app = express();

chai.use(chaiHttp);

const assert = chai.assert;

describe('Register Route', () => {
  // Example test case for a successful registration
  it('should register a new user', async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Wick',
      email: 'john.wick@example.com',
      password: 'password123',
      picturePath: 'server/public/assets/linkedin.png',
      friends: [],
    };

    const response = await chai
      .request(app)
      .post('/auth/register')
      .send(newUser);
    assert.equal(response.status, 201);
  });
});

chai.use(chaiHttp);
const expect = chai.expect;

describe('Login Route', () => {
  it('should log in a user with valid credentials', async () => {
    const userData = {
      email: 'john.wick@example.com',
      password: 'password123',
    };

    const response = await chai
      .request(app)
      .post('/auth/login')
      .send(userData);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('token');
    expect(response.body).to.have.property('user');
    expect(response.body.user).to.have.property('email').equal(userData.email);
  });

  it('should return an error for an invalid user', async () => {
    const invalidUserData = {
      email: 'nonexistentuser@example.com',
      password: 'invalidpassword',
    };

    const response = await chai
      .request(app)
      .post('/auth/login')
      .send(invalidUserData);

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('msg').equal('User does not exist. ');
  });

  it('should return an error for invalid credentials', async () => {
    const invalidCredentials = {
      email: 'john.wick@example.com',
      password: 'wrongpassword',
    };

    const response = await chai
      .request(app)
      .post('/auth/login')
      .send(invalidCredentials);

	await User.deleteOne({firstName: 'John', lastName: 'Wick'});

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('msg').equal('Invalid credentials. ');
  });
});
