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

const searchUser = ({ username, password }) => {
  return db
    .query("SELECT username, password FROM hamsters WHERE username = $1", [
      username
    ])
    .then(response => {
      return bcrypt.compare(password, response.rows[0].password);
    });
};

module.exports = { createUser, searchUser };
