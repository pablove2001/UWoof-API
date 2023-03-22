const Message = require('./../models/message');

function getMessages(req, res) {
    Message.find({ deleted: false }).then(messages => {
        res.json(messages);
    }).catch(err => {
        console.error(err);
        res.status(400).send('Something went wrong');
    });
}

function getMessage(req, res) {
    Message.findOne({ _id: req.params.id, deleted: false }).then(message => {
        res.status(200).json(message);
    }).catch(err => {
        console.error(err);
        res.status(404).send('Message not found');
    });
}

//agregar get de mensajes en especifico de un chat

function postMessage(req, res) {
    try {
        const message = new Message({
            user: req.body.user,
            publication_date: req.body.publication_date,
            chat_id: req.body.chat_id,
            message: req.body.message,
            deleted: req.body.deleted,
            status: req.body.status
        });
        message.save().then(newMessage => {
            res.status(200).json(newMessage);
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: 'Invalid input data'
        });
    }
}

function deleteMessage(req, res) {
    Message.findByIdAndDelete(req.params.id).then(message => {
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.json({ message: 'Message deleted successfully', message: message });
    }).catch(error => {
        res.status(400).json({ message: 'Internal Server Error' });
    });
}

module.exports = { getMessages, getMessage, postMessage, deleteMessage };