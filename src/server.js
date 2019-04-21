const { createServer } = require("http");
const router = require("./router");

const server = createServer(router);

require("dotenv").config();

server.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
