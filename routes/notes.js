const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const readfile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile)
const emptyArray = []

function queryNotes() {
  return readfile("db/db.json", "utf-8").then((studentnotes) =>
    emptyArray.concat(JSON.parse(studentnotes))
  );
}

router.get("/notes", (req, res) => {
  queryNotes().then((notes) => res.json(notes)).catch(err => res.json(err))
});

router.post("/notes", (req, res) => {
  queryNotes().then((notes) => {
    const newArray = [...notes, {title:req.body.title, text:req.body.text, id:1}]
    console.log(newArray)
    writeFile("db/db.json", JSON.stringify(newArray)).then(() => res.json({msg:"ok"}))
  });
});

module.exports = router;
