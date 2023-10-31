const request = require('supertest');
const app = require('../app');
const {sequelize} = require("../models");
const {queryInterface} = sequelize;

beforeAll((done) => {

  queryInterface.bulkInsert("Todo", [
      {
          id: 9999991,
          title: "Wanna sleep",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          id: 9999992,
          title: "Eat",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          id: 9999993,
          title: "Run",
          createdAt: new Date(),
          updatedAt: new Date()
      }
  ], {})
  .then(_ => {
      done()
  })
  .catch(err => {
      done(err)
  }) 
})

afterAll((done) => {

  queryInterface.bulkDelete("Todo", null, {})
      .then(_ => {
          done()
      })
      .catch(err => {
          done(err)
      })
})

// UNIT TESTING / TEST DRIVEN DEVELOPMENT
// TEST SETIAP ENDPOINT YANG DIBUAT

describe("GET /todos", () => {

  it("Get list todos", (done) => {
      
      request(app)
          .get("/todos")
          .expect('Content-Type', /json/)
          .expect(200)
          .then((res) => {
              const {data} = res.body;
              expect(data.length).toBe(1)
              const firstData = data[0]

              expect(firstData.title).toEqual("Wanna sleep")
              done();
          })
          .catch(err => {
              done(err);
          })
          
  })
})

describe("GET /todos/:id", () => {

  it("Get Todo Detail", (done) => {
      
      request(app)
          .get(`/todos/${9999992}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((res) => {
              const {data} = res.body;
              expect(data.id).toEqual(9999992)
              expect(data.title).toEqual("Eat")
              done();
          })
          .catch(err => {
              done(err);
          })
  })

  it("Todo Not Found", (done) => {

      request(app)
          .get(`/games/${6666}`)
          .expect('Content-Type', /json/)
          .expect(404)
          .then((res) => {
              const {message} = res.body;

              expect(message).toEqual("Todo Not Found")
              done();
          })
          .catch(err => {
              done(err);
          })
  })
})

describe("POST /todos", () => {

  it("Create todo successfully", (done) => {

      request(app)
          .post("/todos")
          .send({
              title: "Try my best"
          })
          .expect('Content-Type', /json/)
          .expect(201)
          .then((res) => {
              const {message, data} = res.body;

              expect(message).toEqual("New Todo created successfully")
              expect(data.title).toEqual("Try my best")
              done();
          })
          .catch(err => {
              done(err)
          })
  })

})


describe("DELETE /todos/:id", () => {

  it("Todo deleted successfully", (done) => {
      request(app)
          .delete(`/todos/${9999992}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((res) => {
              const {message} = res.body;

              expect(message).toEqual("Todo deleted")
              done();
          })
          .catch(err => {
              done(err);
          }) 
  })
})