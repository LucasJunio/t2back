const router = require("express").Router();

router.use('/auth', require('./auth.routes'))
router.use('/category', require('./category.routes'))
router.use('/conquest', require('./conquest.routes'))
router.use('/content', require('./content.routes'))
router.use('/office', require('./office.routes'))
router.use('/question', require('./question.routes'))
router.use('/skill', require('./skill.routes'))
router.use('/tip', require('./tip.routes'))
router.use("/user", require("./user.routes"));

module.exports = router;
