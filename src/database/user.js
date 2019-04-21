const bcrypt = require("bcrypt");
const db = require("./connection");

const createUser = ({ username, password }) => {
  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => {
      return db.query(
        "INSERT INTO hamsters (username, password) VALUES ($1, $2)",
        [username, hash]
      );
    });
};

module.exports = { createUser };
