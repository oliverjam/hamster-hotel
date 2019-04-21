const { exec } = require("child_process");
const { build } = require("./database/build");
/* eslint-disable no-console */

console.log("Creating database `hamsterdev`");
exec("createdb hamsterdev", error => {
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
});
