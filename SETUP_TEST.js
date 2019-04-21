const { exec } = require("child_process");
const { build } = require("./database/build");
/* eslint-disable no-console */

console.log("Creating database `hamstertest`");
exec(
  `psql <<EOF
\\x
CREATE DATABASE hamstertest;
CREATE USER hamstertester WITH SUPERUSER PASSWORD 'test';
ALTER DATABASE hamstertest OWNER TO hamstertester;
EOF`,
  error => {
    if (error) {
      console.error(error);
    } else {
      console.log("Created database `hamstertest`");
    }
    build()
      .then(() => {
        console.log("Successfully populated `hamstertest`");
        process.exit(0);
      })
      .catch(console.error);
  }
);
