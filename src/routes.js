const router = require("express").Router();

const homeController = require('./controllers/homeController');
const usersController = require('./controllers/authController');
const booksController = require('./controllers/booksController');

router.use('/', homeController);
router.use('/auth', usersController);
router.use('/books', booksController);


module.exports = router;