const express = require('express');
const router = require('express').Router();
const usersRoutes = require('./users');
const petsRoutes = require('./pets');
const chatsRoutes = require('./chats');
const messagesRoutes = require('./messages');
const commentsRoutes = require('./comments');
const rutasAuth = require('./auth');
const { validateToken } = require('./../middlewares');

router.use('', express.json(), rutasAuth); 
router.use('/users', usersRoutes);
router.use('/pets', petsRoutes);
router.use('/chats', validateToken, chatsRoutes);
router.use('/messages', messagesRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;