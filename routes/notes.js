const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const readfile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile)
const {v4:uuidv4}=require("uuid")

function queryNotes() {
  return readfile("db/db.json", "utf-8").then((studentnotes) =>
    [].concat(JSON.parse(studentnotes))
  );
}

router.get("/notes", (req, res) => {
  queryNotes().then((notes) => res.json(notes)).catch(err => res.json(err))
});

router.post("/notes", (req, res) => {
  queryNotes().then((notes) => {
    const updatedArray = [...notes, {title:req.body.title, text:req.body.text, id:uuidv4()}]
    console.log(updatedArray)
    writeFile("db/db.json", JSON.stringify(updatedArray)).then(() => res.json({msg:"ok"})).catch(err => res.json(err))
  });
});

module.exports = router;
