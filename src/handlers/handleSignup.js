const { parse } = require("querystring");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const error = require("../templates/error");
const home = require("../templates/home");
const { createUser } = require("../database/user");

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
    createUser({ username, password })
      .then(() => {
        const signed = jwt.sign({ username }, process.env.SECRET);
        response.writeHead(302, {
          location: "/",
          "set-cookie": cookie.serialize("user", signed, { httpOnly: true }),
        });
        response.end();
      })
      .catch(err => {
        console.log(err);
        // error: duplicate key 23505 error code
        if (err.code === "23505") {
          response.writeHead(400, { "content-type": "text/html" });
          const html = home({
            message: "sorry, that username is already taken!",
          });
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
