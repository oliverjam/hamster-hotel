const { parse } = require("cookie");
const jwt = require("jsonwebtoken");
const home = require("../templates/home");

const handleHome = (request, response) => {
  const { cookie } = request.headers;
  const { user } = cookie ? parse(cookie) : {};
  const { username } = user ? jwt.verify(user, process.env.SECRET) : {};
  response.writeHead(200, { "content-type": "text/html" });
  const html = home({ username });
  response.end(html);
};

module.exports = handleHome;
