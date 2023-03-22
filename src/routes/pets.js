const express = require('express');
const router = express.Router();
const { getPets, getPet, postPet, putPet, deletePet } = require('./../controllers/pets');


router.get('', getPets);

router.get('/:id', getPet);

router.post('', express.json(), postPet);

router.put('/:id', express.json(), putPet);

router.delete('/:id', deletePet);


module.exports = router;