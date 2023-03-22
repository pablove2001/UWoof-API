const Comment = require('./../models/comment');

function getComments(req, res) {
    Comment.find({ deleted: false }).then(comments => {
        res.json(comments);
    }).catch(err => {
        console.error(err);
        res.status(400).send('Something went wrong');
    });
}

function getComment(req, res) {
    Comment.findOne({ _id: req.params.id, deleted: false }).then(comment => {
        res.status(200).json(comment);
    }).catch(err => {
        console.error(err);
        res.status(404).send('Comment not found');
    });
}

//agregar get comentarios de un post en especifico

function postComment(req, res) {
    try {
        const comment = new Comment({
            comment: req.body.comment,
            comment_user: req.body.comment_user,
            publication_date: req.body.publication_date,
            deleted: req.body.deleted,
            pet_post_id: req.body.pet_post_id
        });
        comment.save().then(newComment => {
            res.status(200).json(newComment);
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: 'Invalid input data'
        });
    }
}

function deleteComment(req, res) {
    Comment.findByIdAndDelete(req.params.id).then(comment => {
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted successfully', comment: comment });
    }).catch(error => {
        res.status(400).json({ message: 'Internal Server Error' });
    });
}

module.exports = { getComments, getComment, postComment, deleteComment };