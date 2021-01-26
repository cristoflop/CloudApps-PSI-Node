"use strict"

const app = require('../../src/app');
const AWS = require("aws-sdk-mock");

const mockedFilms = require("../mockedFilms");

const supertest = require('supertest');

const request = supertest(app);

test('Get films endpoint', async () => {

    AWS.mock('DynamoDB.DocumentClient', 'scan', function (params, callback) {
        callback(null, {Items: mockedFilms});
    });

    const response = await request.get('/api/films')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response.body.length).toBe(3);

});

test('Save films endpoint', async () => {

    AWS.mock('DynamoDB.DocumentClient', 'put', function (params, callback) {
        callback(null, "Film saved");
    });

    const response = await request.post('/api/films')
        .expect('Content-Type', /json/)
        .expect(201);

});