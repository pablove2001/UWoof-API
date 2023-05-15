const express = require('express');
const router = express.Router();
const { login, googleLogin } = require('./../controllers/users');

router.post('/login', login);
router.post('/login/google', googleLogin);

module.exports = router;