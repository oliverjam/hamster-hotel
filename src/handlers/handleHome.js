const home = require("../templates/home");

const handleHome = (_request, response) => {
  response.writeHead(200, { "content-type": "text/html" });
  const html = home();
  response.end(html);
};

module.exports = handleHome;
