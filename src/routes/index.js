const router = require("express").Router();
const authMiddleware = require('../middleware/auth.js')

router.use('/auth', require('./auth.routes'))
router.use('/department', require('./department.routes'))
router.use('/adress', require('./adress.routes'))
router.use('/segment', require('./segment.routes'))
router.use('/office', require('./office.routes'))
router.use("/user", require("./user.routes"));
router.use('/company', require('./company.routes'))
router.use('/contact', require('./contact.routes'))
router.use('/conquest', require('./conquest.routes'))
router.use('/content', require('./content.routes'))
router.use('/question', require('./question.routes'))
router.use('/skill', require('./skill.routes'))

module.exports = router;