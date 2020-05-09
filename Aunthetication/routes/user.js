const router = require('express').Router();
const UserController = require('../controller/user');

 router.route('/signin').post(UserController.signin);
 router.route('/signup').post(UserController.signup);
 router.route('/secret').get(UserController.secret);

 module.exports = router;
