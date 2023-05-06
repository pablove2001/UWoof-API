const express = require('express');
const router = express.Router();
const { login, googleLogin, registro } = require('./../controllers/users');

router.post('/login', login);
router.post('/login/google', googleLogin);
router.post('/registro', registro);

module.exports = router;