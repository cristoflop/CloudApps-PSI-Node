"use strict"

const app = require('../../src/app');
const mongoose = require("mongoose");
const {GenericContainer} = require("testcontainers");

const mockedFilms = require("../mockedFilms");

const supertest = require('supertest');

let mongoContainer;

const request = supertest(app);

const FilmController = require("../../src/controllers/FilmController");
jest.mock("../../src/controllers/FilmController");

beforeAll(async () => {
    mongoContainer = await new GenericContainer("mongo", "3.6.21")
        .withExposedPorts(27017)
        .start();

    await mongoose.connect('mongodb://localhost:' + mongoContainer.getMappedPort(27017));
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoContainer.stop();
});

test('Get films endpoint with testcontainers', async () => {

    FilmController.get.mockImplementation((mockedFilms, callback) => {
        callback(null, mockedFilms);
    });

    const response = await request.get('/api/films')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response.body.length).toBe(3);

});

test('Save films endpoint with testcontainers', async () => {

    const film = {
        id: 1,
        title: "Vendo Opel Corsa - test",
        author: "Cristofer"
    };

    FilmController.post.mockImplementation((film, callback) => {
        callback(null, film);
    });

    const response = await request.post('/api/films')
        .send(film)
        .expect('Content-type', /json/)
        .expect(201);

    expect(response.body.author).toBe("Cristofer");

});