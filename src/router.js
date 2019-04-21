const { parse } = require("querystring");
const home = require("./templates/home");
const error = require("./templates/error");

const router = (request, response) => {
  if (request.url === "/") {
    response.writeHead(200, { "content-type": "text/html" });
    const html = home();
    response.end(html);
  } else if (request.url === "/login") {
    let data = "";
    request.on("data", chunk => {
      data += chunk;
    });
    request.on("end", error => {
      if (error) {
        response.writeHead(500, { "content-type": "text/html" });
        const html = error({ status: 500 });
        response.end(html);
      }
      const { username, password } = parse(data);
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({ username, password }));
    });
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    const html = error({ status: 404 });
    response.end(html);
  }
};

module.exports = router;
