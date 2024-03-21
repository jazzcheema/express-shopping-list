const request = require("supertest");

const app = require("./app");
let { items } = require("./fakeDb");

let banana = { name: "banana", price: 1.25 };
let cherry = { name: "cherry", price: 1.50 };


beforeEach(function () {
  items.push({...banana});
  items.push({...cherry});
});

afterEach(function () {
  items.length = 0;
});


/** GET /items checks for items in shopping list. */
describe("GET /items", function () {
  it("Get list of shopping items", async function () {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({ items: [banana, cherry] });
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


/** PATCH /items/[name] - update item; return updated item */
describe("PATCH /items/:name", function () {
  it("Updates a item in list", async function () {
    const resp = await request(app)
      .patch(`/items/${banana.name}`)
      .send({
        name: "newbanana",
        price: 2.50
      });
    expect(resp.body).toEqual({
      updated: {
        name: "newbanana",
        price: 2.50
      }
    });
  });

  it("Responds with 404 if name invalid", async function () {
    const resp = await request(app).patch(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });

  it("Responds with 400 if update to a name that already exists", async function () {
    const resp = await request(app)
      .patch(`/items/${cherry.name}`)
      .send({
        name: "banana",
        price: 2.50
      });
    expect(resp.statusCode).toEqual(400);
  });
});

/** DELETE /items/[name] - delete item,
 *  return `{message: "Deleted"}` */
describe("DELETE /items/:name", function () {

  it("Deletes a single item", async function () {
    const resp = await request(app)
      .delete(`/items/cherry`);
    expect(resp.body).toEqual({ message: "Deleted" });

    const resp2 = await request(app).get(`/items`);
    expect(resp2.body.items.length).toEqual(1);
  });
});