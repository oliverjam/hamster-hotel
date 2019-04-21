const router = (request, response) => {
  response.writeHead(200, { "content-type": "text/html" });
  response.end("<title>Hamster Hotel</title>");
};

module.exports = router;
