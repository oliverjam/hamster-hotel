const error = require("../templates/error");

const handleMissing = (_request, response) => {
  response.writeHead(404, { "content-type": "text/html" });
  const html = error({ status: 404 });
  response.end(html);
};

module.exports = handleMissing;
