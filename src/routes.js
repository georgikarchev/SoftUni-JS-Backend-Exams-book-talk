const router = require("express").Router();

const homeController = require('./controllers/homeController');
const usersController = require('./controllers/authController');
const bookController = require('./controllers/bookController');

router.use('/', homeController);
router.use('/auth', usersController);
router.use('/books', bookController);

// router.all("/*", function (req, res) {
//   res.redirect('/404');
// })


module.exports = router;