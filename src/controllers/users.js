const User = require('./../models/user')

function getUsers(req, res) {
    User.find({ deleted: false }).then(users => {
        res.json(users);
    }).catch(err => {
        console.error(err);
        res.status(400).send('Something went wrong');
    });
}

function getUser(req, res) {
    User.findOne({ _id: req.params.id, deleted: false }).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        console.error(err);
        res.status(404).send('User not found');
    });
}

function postUser(req, res) {
    try {
        const user = new User({
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            birthday: req.body.birthday,
            profile_picture: req.body.profile_picture,
        });
        user.save().then(newUser => {
            res.status(200).json(newUser);
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: 'Invalid input data'
        });
    }
}

function putUser(req, res) {
    User.findOne({ _id: req.params.id, deleted: false }).then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.type = req.body.type || user.type;
        user.name = req.body.name || user.name;
        user.last_name = req.body.last_name || user.last_name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.birthday = req.body.birthday || user.birthday;
        user.profile_picture = req.body.profile_picture || user.profile_picture;

        user.save().then(updatedUser => {
            res.status(200).json(updatedUser);
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

function deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id).then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', user: user });
    }).catch(error => {
        res.status(400).json({ message: 'Internal Server Error' });
    });
    // User.findOne({ _id: req.params.id, deleted: false }).then(user => {
    //     if (!user) {
    //         return res.status(404).json({ message: 'User not found' });
    //     }

    //     user.deleted = true;

    //     user.save().then(deletedUser => {
    //         res.json({ message: 'User deleted successfully', deletedUser: deletedUser });
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

module.exports = { getUsers, getUser, postUser, putUser, deleteUser };