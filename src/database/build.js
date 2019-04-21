const db = require("./connection");

const COLOURS = ["black", "ginger", "white", "brown", "gold"];

const sql = `
BEGIN;
DROP TABLE IF EXISTS hamsters CASCADE;
DROP TYPE IF EXISTS sexes, colours CASCADE;

CREATE TYPE sexes AS ENUM ('m', 'f', 'n');
CREATE TYPE colours AS ENUM (${COLOURS.map(col => `'${col}'`).join(", ")});

CREATE TABLE hamsters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  username VARCHAR(64) NOT NULL UNIQUE,
  password VARCHAR(64) NOT NULL,
  sex sexes,
  colour colours
);

INSERT INTO hamsters (username, password) VALUES
('popchop81', 'carrots4eva'),
('popchop91', '$2b$10$mCoXArsx3d2CMvdr19h0M.bJBtRuAQT5pP7NUxs.J0/RNF8QPMZhS');

COMMIT;
`;

function build() {
  return new Promise((resolve, reject) => {
    db.query(sql, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

module.exports = { COLOURS, build };
