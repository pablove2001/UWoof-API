const Pet = require('./../models/pet')

function getPets(req, res) {
    // console.log('get pets', req.headers);

    if (req.headers.specie == 'all') {
        Pet.find({ deleted: false, purpose_achieved: false }).then(pets => {
            res.json(pets);
        }).catch(err => {
            console.error(err);
            res.status(400).send('Something went wrong');
        });
    } else {
        Pet.find({ deleted: false, purpose_achieved: false, kind_animal: req.headers.specie}).then(pets => {
            res.json(pets);
        }).catch(err => {
            console.error(err);
            res.status(400).send('Something went wrong');
        });
    } 
}

function getPet(req, res) {
    Pet.findOne({ _id: req.params.id, deleted: false }).then(pet => {
        res.status(200).json(pet);
    }).catch(err => {
        console.error(err);
        res.status(404).send('Pet not found');
    });
}

function postPet(req, res) {
    console.log('llego a postPet');
    try {
        const pet = new Pet({
            kind_animal: req.body.kind_animal,
            race: req.body.race,
            name: req.body.name,
            age: req.body.age,
            images: req.body.images,
            vaccinated: req.body.vaccinated,
            castrated: req.body.castrated,
            description: req.body.description,
            height_cm: req.body.height_cm,
            long_cm: req.body.long_cm,
            weight_kg: req.body.weight_kg,
            user_id: req.headers.user_id,
            purpose: req.body.purpose,
        });
        pet.save().then(newPet => {
            res.status(200).json(newPet);
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: 'Invalid input data'
        });
    }
}

function putPet(req, res) {
    Pet.findOne({ _id: req.params.id, deleted: false }).then(pet => {
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        pet.kind_animal = req.body.kind_animal || pet.kind_animal;
        pet.race = req.body.race || pet.race;
        pet.name = req.body.name || pet.name;
        pet.age = req.body.age || pet.age;
        pet.images = req.body.images || pet.images;
        pet.vaccinated = req.body.vaccinated || pet.vaccinated;
        pet.castrated = req.body.castrated || pet.castrated;
        pet.description = req.body.description || pet.description;
        pet.height_cm = req.body.height_cm || pet.height_cm;
        pet.long_cm = req.body.long_cm || pet.long_cm;
        pet.weight_kg = req.body.weight_kg || pet.weight_kg;
        pet.purpose = req.body.purpose || pet.purpose;
        pet.purpose_achieved = req.body.purpose_achieved || pet.purpose_achieved;

        pet.save().then(updatedPet => {
            res.status(200).json(updatedPet);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }).catch(err => {
        console.error(err);
        res.status(400).json({
            message: 'Invalid input data'
        });
    });
}

function deletePet(req, res) {
    Pet.findByIdAndDelete(req.params.id).then(pet => {
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json({ message: 'Pet deleted successfully', pet: pet });
    }).catch(error => {
        res.status(400).json({ message: 'Internal Server Error' });
    });

    // Pet.findOne({ _id: req.params.id, deleted: false }).then(pet => {
    //     if (!pet) {
    //         return res.status(404).json({ message: 'Pet not found' });
    //     }
    //     pet.deleted = true;
    //     pet.save().then(deletedPet => {
    //         res.json({ message: 'Pet deleted successfully', deletedPet: deletedPet });
    //     }).catch(err => {
    //         console.log(err);
    //         res.status(500).json({ message: 'Internal Server Error' });
    //     });
    // }).catch(err => {
    //     console.error(err);
    //     res.status(400).json({
    //         message: 'Invalid input data'
    //     });
    // });
}

module.exports = { getPets, getPet, postPet, putPet, deletePet };