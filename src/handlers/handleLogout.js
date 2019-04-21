const handleLogout = (_request, response) => {
  response.writeHead(302, { location: "/", "set-cookie": "user=0; Max-Age=0" });
  response.end();
};

module.exports = handleLogout;
