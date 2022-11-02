const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const readfile = util.promisify(fs.readFile);

function queryNotes() {
  return readfile("db/db.json", "utf-8").then((rawnotes) =>
    [].concat(JSON.parse(rawnotes))
  );
}

router.get("/notes", (req, res) => {
  queryNotes().then((notes) => res.json(notes));
});
// router.post

module.exports = router;
