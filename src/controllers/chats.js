const Chat = require('./../models/chat');

function getChats(req, res) {
    Chat.find({ deleted: false }).then(chats => {
        res.json(chats);
    }).catch(err => {
        console.error(err);
        res.status(400).send('Something went wrong');
    });
}

function getChat(req, res) {
    Chat.findOne({ _id: req.params.id, deleted: false }).then(chat => {
        res.status(200).json(chat);
    }).catch(err => {
        console.error(err);
        res.status(404).send('Chat not found');
    });
}

function postChat(req, res) {
    try {
        const chat = new Chat({
            owner_user_id: req.body.owner_user_id,
            interested_user_id: req.body.interested_user_id,
            creation_date: req.body.creation_date
        });
        chat.save().then(newChat => {
            res.status(200).json(newChat);
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: 'Invalid input data'
        });
    }
}

function deleteChat(req, res) {
    Chat.findByIdAndDelete(req.params.id).then(chat => {
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.json({ message: 'Chat deleted successfully', chat: chat });
    }).catch(error => {
        res.status(400).json({ message: 'Internal Server Error' });
    });
}

module.exports = { getChats, getChat, postChat, deleteChat };