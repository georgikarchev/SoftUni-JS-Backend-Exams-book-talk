const router = require("express").Router();

const homeController = require('./controllers/homeController');
const usersController = require('./controllers/usersController');
const booksController = require('./controllers/booksController');

router.use('/', homeController);
router.use('/users', usersController);
router.use('/books', booksController);


module.exports = router;