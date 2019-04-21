const { parse } = require("querystring");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const error = require("../templates/error");
const home = require("../templates/home");
const db = require("../../database/connection");

const handleSignup = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", err => {
    if (err) {
      response.writeHead(500, { "content-type": "text/html" });
      const html = error({ status: 500 });
      response.end(html);
    }
    const { username, password } = parse(data);
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => {
        return db.query(
          "INSERT INTO hamsters (username, password) VALUES ($1, $2)",
          [username, hash]
        );
      })
      .then(() => {
        console.log("successful signup");
        const signed = jwt.sign({ username }, process.env.SECRET);
        console.log(signed);
        response.writeHead(302, {
          Location: "/",
          "set-cookie": `user=${signed}; HttpOnly`
        });
        response.end();
      })
      .catch(err => {
        console.log(err);
        // error: duplicate key 23505 error code
        if (err.code === "23505") {
          response.writeHead(400, { "content-type": "text/html" });
          const html = home("sorry, that username is already taken!");
          response.end(html);
        } else {
          response.writeHead(500, { "content-type": "text/html" });
          const html = error({ status: 500 });
          response.end(html);
        }
      });
  });
};

module.exports = handleSignup;
