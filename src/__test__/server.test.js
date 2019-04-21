const supertest = require("supertest");
const router = require("../router");

describe("Server routes", () => {
  test("home route is rendered correctly", () => {
    return supertest(router)
      .get("/")
      .expect(200)
      .expect("content-type", "text/html")
      .then(response => {
        expect(response.text).toMatch(/<title>Hamster Hotel<\/title>/);
      });
  });
  test("nonexistent route renders error", () => {
    return supertest(router)
      .get("/boobs")
      .expect(404)
      .expect("content-type", "text/html")
      .then(response => {
        expect(response.text).toMatch(
          /<title>Not found | Hamster Hotel<\/title>/
        );
      });
  });
  test("login route returns JSON data for now", () => {
    const formData = "username=oli&password=hello";
    return supertest(router)
      .post("/login")
      .send(formData)
      .expect(200)
      .expect("content-type", "application/json")
      .then(response => {
        expect(response.body).toEqual({ username: "oli", password: "hello" });
      });
  });
});
