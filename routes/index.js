const router = require("express").Router();
const apiroutes = require("./notes");
const viewroutes = require("./views");

router.use("/", viewroutes);
router.use("/api", apiroutes);

module.exports = router;
