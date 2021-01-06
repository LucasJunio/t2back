const router = require("express").Router();
// const authMiddleware = require('../middleware/auth.js')

router.use('/auth', require('./auth.routes'))
router.use("/user", require("./user.routes"));

module.exports = router;