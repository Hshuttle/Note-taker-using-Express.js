const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const readfile = util.promisify(fs.readFile);
emptyarray = [];
function queryNotes() {
  return readfile("db/db.json", "utf-8").then((rawnotes) =>
    emptyarray.concat(JSON.parse(rawnotes))
  );
}

router.get("/notes", (req, res) => {
  queryNotes().then((notes) => res.json(notes));
});

router.post("/notes", (req, res) => {
  queryNotes().then((notes) => res.json(notes));
});
module.exports = router;
