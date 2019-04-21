const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const router = require("../router");
const { build } = require("../database/build");
require("dotenv").config();

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
  test("logged in home route is rendered correctly", () => {
    const user = jwt.sign({ username: "oli" }, process.env.SECRET);
    return supertest(router)
      .get("/")
      .set("cookie", [`user=${user}`])
      .expect(200)
      .expect("content-type", "text/html")
      .then(response => {
        expect(response.text).toMatch(/<title>Hamster Hotel<\/title>/);
        expect(response.text).toMatch(/<a href="\/logout">/i);
      });
  });
  test("nonexistent route renders error", () => {
    return supertest(router)
      .get("/bunnies")
      .expect(404)
      .expect("content-type", "text/html")
      .then(response => {
        expect(response.text).toMatch(
          /<title>Not found | Hamster Hotel<\/title>/
        );
      });
  });
  test("unauthenticated login returns error", () => {
    const formData = "username=oli&password=hello";
    return supertest(router)
      .post("/login")
      .send(formData)
      .expect(401)
      .expect("content-type", "text/html")
      .then(response => {
        expect(response.text).toMatch(/incorrect login details/);
      });
  });
  test("authenticated login redirects to logged in home", () => {
    const formData = "username=popchop91&password=carrots4eva";
    return supertest(router)
      .post("/login")
      .send(formData)
      .expect(302)
      .expect("location", "/")
      .then(response => {
        expect(response.headers["set-cookie"]).toBeTruthy();
      });
  });
  test("signup route redirects to homepage", async () => {
    await build();
    const formData = "username=oli&password=hello";
    return supertest(router)
      .post("/signup")
      .send(formData)
      .expect(302)
      .expect("location", "/")
      .then(response => {
        expect(response.headers["set-cookie"]).toBeTruthy();
      });
  });
});
