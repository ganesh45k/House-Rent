const express = require('express');
const authController = require('../controller/auth.controller');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/google', authController.google);
router.get('/signout', authController.signOut);

module.exports = router;
