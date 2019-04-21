const supertest = require("supertest");
const router = require("../router");

test("home route returns a status code 200", () => {
  return supertest(router)
    .get("/")
    .expect(200)
    .expect("content-type", "text/html")
    .then(response => {
      expect(response.text).toMatch(/<title>Hamster Hotel<\/title>/);
    });
});
