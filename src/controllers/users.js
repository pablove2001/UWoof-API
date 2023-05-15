const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const User = require('./../models/user');
const { generateToken } = require('./../middlewares');

require('dotenv').config();

const googleClient = new OAuth2Client(process.env.GOOGLE_ID);


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
    console.log('post user');
    console.log(req);
    console.log(req.body);
    try {
        const user = new User({
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            birthday: req.body.birthday,
            profile_picture: req.body.profile_picture,
        });
        user.save().then(response => {
            const token = generateToken({ id: response._id, role: response.role, name: response.name, last_name: response.last_name })
            res.status(200).send({token, "userId":response._id});
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
}

function login(req, res) {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }).then(response=> {
        if(response) {
            const token = generateToken({ id: response._id, role: response.role, name: response.name, last_name: response.last_name })
            console.log({token, "userId":response._id});
            res.send({token, "userId":response._id});
        } else {}
    })
    .catch(response => {

    });
}

function googleLogin(req, res){
    console.log('googleLogin')
    const idToken = req.body.idToken;

    googleClient.verifyIdToken({ idToken: idToken }).then(response => {
        const user = response.getPayload();
        console.log(user.email);

        User.findOne({
            email: user.email
        }).then(async response=> {
            console.log('response: ', response);
            if(response) {
                console.log('if');
                const token = generateToken({ id: response._id, role: response.role, name: response.name, last_name: response.last_name });
                console.log("api token", token);
                res.send({token, "userId":response._id});
                return;
            } else {
                console.log('no exite usuario');
                console.log('req')
                const newUser = new User({
                    name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    profile_picture: req.body.photoUrl,
                });
                console.log('new uuser', newUser);
                newUser.save().then(response2 => {
                    console.log('new user', response2);
                    if (!response2) return res.status(401).send({ msg: 'token invalido' });

                    const token = generateToken({ id: response2._id, role: response2.role, name: response2.name, last_name: response2.last_name });
                    console.log("api token", token);
                    res.send({token, "userId":response2._id});
                    return;
                });
            }
        })
        .catch(response => {
            console.log('cathc ',response);
            res.status(401).send({ msg: 'token invalido' });
            return;
        });

        console.log('ninguan de las anteriores');

        
    }).catch(err => {
        res.status(401).send({ msg: 'token invalido' });
    });
}

module.exports = { getUsers, getUser, postUser, putUser, deleteUser, login, googleLogin };