const { exec } = require("child_process");
const { build } = require("./database/build");
/* eslint-disable no-console */

console.log("Creating database `hamsterdev`");
exec(
  `psql <<EOF
\\x
CREATE DATABASE hamsterdev;
CREATE USER hamsterdeveloper WITH SUPERUSER PASSWORD 'dev';
ALTER DATABASE hamsterdev OWNER TO hamsterdeveloper;
EOF`,
  error => {
    if (error) {
      console.error(error);
    } else {
      console.log("Created database `hamsterdev`");
    }
    build()
      .then(() => {
        console.log("Successfully populated `hamsterdev`");
        process.exit(0);
      })
      .catch(console.error);
  }
);
