const { parse } = require("querystring");
const error = require("../templates/error");

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
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ username, password }));
  });
};

module.exports = handleLogin;
