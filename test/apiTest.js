"use strict"

const app = require('../src/app');

const supertest = require('supertest');

const request = supertest(app);

test('gets the ads endpoint', async () => {

    /*
    const response = await request.get('/api/films')
        .expect('Content-type', /json/)
        .expect(200)
    expect(response.body.length).toBe(3);

     */
});