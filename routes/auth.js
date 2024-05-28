const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');


router.post('/auth/sign-up', AuthController.register);
router.post('/auth/sign-in', AuthController.login);
router.post('/update/user/:userId', AuthController.updateUser);

module.exports = router;