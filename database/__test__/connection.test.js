const db = require("../connection");
const { build } = require("../build");

beforeEach(async () => {
  await build();
});

describe("DB connection", () => {
  test("Returns error when relation does not exist", done => {
    db.query("SELECT * FROM blah", error => {
      expect(error).toMatchInlineSnapshot(
        `[error: relation "blah" does not exist]`
      );
      done();
    });
  });
  test("Returns a hamster", done => {
    db.query("SELECT * FROM hamsters", (error, data) => {
      expect(error).toBeFalsy();
      const { rows } = data;
      const [hamster] = rows;
      expect(hamster.username).toBe("popchop81");
      done();
    });
  });
});
