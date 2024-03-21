const request = require("supertest");

const app = require("./app");
let { items } = require("./fakeDb");

let banana = { name: "banana", price: 1.25 };

beforeEach(function () {
  items.push(banana);
});

afterEach(function () {
  items = [];
});





/** GET /items checks for items in shopping list. */
describe("GET /items", function () {
  it("Get list of shopping items", async function () {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({ items: [banana] });
  });
});




/** POST /items - add item to shopping list; returns added item. */

describe("POST /items", function () {
  it("Adds new item to list", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: cherry,
        price: 2.50
      });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      added:
      {
        name: cherry,
        price: 2.50
      }
    });
  });
});



/** PATCH /items/[name] - update item; return `{cat: cat}` */

describe("PATCH /items/:name", function () {
  it("Updates a item in list", async function () {
    const resp = await request(app)
      .patch(`/cats/${pickles.name}`)
      .send({
        name: "Troll"
      });
    expect(resp.body).toEqual({
      cat: { name: "Troll" }
    });
  });

  it("Responds with 404 if name invalid", async function () {
    const resp = await request(app).patch(`/cats/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});




/** DELETE /cats/[name] - delete cat,
 *  return `{message: "Cat deleted"}` */

describe("DELETE /cats/:name", function () {
  it("Deletes a single a cat", async function () {
    const resp = await request(app)
      .delete(`/cats/${pickles.name}`);
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(db.Cat.all().length).toEqual(0);
  });
});