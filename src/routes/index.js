const router = require("express").Router();
const authMiddleware = require('../middleware/auth.js')

router.use('/auth', require('./auth.routes'))
router.use('/department', require('./department.routes'))
router.use('/adress', require('./adress.routes'))
router.use('/interest', require('./interest.routes'))
router.use('/contenttype', require('./contenttype.routes'))
router.use('/segment', require('./segment.routes'))
router.use('/office', require('./office.routes'))
router.use("/user", require("./user.routes"));
router.use('/company', require('./company.routes'))
router.use('/companytype', require('./companytype.routes'))
router.use('/contact', require('./contact.routes'))
router.use('/conquest', require('./conquest.routes'))
router.use('/content', require('./content.routes'))
router.use('/question', require('./question.routes'))
router.use('/quadrant', require('./quadrant.routes'))
router.use('/skill', require('./skill.routes'))
router.use('/sublevel', require('./sublevel.routes'))
router.use('/targetaudience', require('./targetaudience.routes'))
router.use('/sublevelskill', require('./sublevelskill.routes'))
router.use('/officeskill', require('./officeskill.routes'))

module.exports = router;