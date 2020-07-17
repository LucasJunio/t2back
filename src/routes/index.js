const router = require("express").Router();
const authMiddleware = require('../middleware/auth.js')

router.use('/auth', require('./auth.routes'))
router.use('/category', authMiddleware, require('./category.routes'))
router.use('/conquest', authMiddleware, require('./conquest.routes'))
router.use('/content', authMiddleware, require('./content.routes'))
router.use('/office', authMiddleware, require('./office.routes'))
router.use('/question', authMiddleware, require('./question.routes'))
router.use('/skill', authMiddleware, require('./skill.routes'))
router.use('/tip', authMiddleware, require('./tip.routes'))
router.use("/user", authMiddleware, require("./user.routes"));

module.exports = router;
