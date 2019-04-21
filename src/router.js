const { handleHome, handleMissing, handleLogin } = require("./handlers");

const router = (request, response) => {
  if (request.url === "/") {
    handleHome(request, response);
  } else if (request.url === "/login") {
    handleLogin(request, response);
  } else {
    handleMissing(request, response);
  }
};

module.exports = router;
