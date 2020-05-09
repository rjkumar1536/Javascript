const express = require('express');
const userController = require('../Controller/userController.js');
const router = require('express-promise-router')();
const {validateBody , schemas} = require('../helpers/routeHelper');
// const router = express.Router();
router.route('/signup').post( validateBody(schemas.authSchema),userController.signUp);

router.route('/signin').post(userController.signIn);

router.route('/secret').get(userController.secret);


module.exports = router;