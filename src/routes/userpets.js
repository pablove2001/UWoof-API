const express = require('express');
const router = express.Router();
const { getUserPets, deletePet } = require('./../controllers/pets');

router.get('/', getUserPets);

router.get('/delete', deletePet);

module.exports = router;