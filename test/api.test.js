"use strict"

const app = require('../src/app');
const AWS = require("aws-sdk-mock");

const supertest = require('supertest');

const request = supertest(app);

const newMockedFilm = {
    id: 1,
    title: "La guerra de las galaxias",
    author: "George Lucas"
}

const mockedFilms = [
    {
        id: 1,
        title: "La guerra de las galaxias",
        author: "George Lucas"
    },
    {
        id: 2,
        title: "El señor de los anillos",
        author: "J. R. R. Tolkien"
    },
    {
        id: 3,
        title: "Harry Potter",
        author: "J. K. Rowling"
    }
]

test('Get films endpoint', async () => {

    AWS.mock('DynamoDB.DocumentClient', 'scan', function (params, callback) {
        callback(null, {Items: mockedFilms});
    });

    const response = await request.get('/api/films')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response.body.length).toBe(3);

});