const { parse } = require("querystring");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const error = require("../templates/error");
const home = require("../templates/home");
const { searchUser } = require("../database/user");

const handleLogin = (request, response) => {
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
    searchUser({ username, password })
      .then(authenticated => {
        if (authenticated) {
          const signed = jwt.sign({ username }, process.env.SECRET);
          response.writeHead(302, {
            location: "/",
            "set-cookie": cookie.serialize("user", signed, { httpOnly: true })
          });
          response.end();
        } else {
          response.writeHead(401, { "content-type": "text/html" });
          const html = home({ message: "incorrect login details" });
          response.end(html);
        }
      })
      .catch(err => {
        console.log(err);

        response.writeHead(500, { "content-type": "text/html" });
        const html = error({ status: 500 });
        response.end(html);
      });
  });
};

module.exports = handleLogin;
