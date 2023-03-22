const express = require('express');
const router = express.Router();
const { getUsers, getUser, postUser, putUser, deleteUser } = require('./../controllers/users');


router.get('', getUsers);

router.get('/:id', getUser);

router.post('', express.json(), postUser);

router.put('/:id', express.json(), putUser);

router.delete('/:id', express.json(), deleteUser);


module.exports = router;