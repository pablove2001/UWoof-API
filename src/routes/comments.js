const express = require('express');
const router = express.Router();
const { getComments, getComment, postComment, deleteComment } = require('./../controllers/comments');

/**
 * @swagger
 * /comments:
 *   get:
 *     description: List of comments from mongodb.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: list of comments.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get a list of comments in our db.
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             comment:
 *               type: string
 *             comment_user:
 *               type: string
 *             publication_date:
 *               type: Date
 *             deleted:
 *                 type: boolean
 *             pet_post_id:
 *                 type: string
 *       400:
 *         description: Something went wrong.
 */
router.get('', getComments);

/**
 * @swagger
 * /comments/id:
 *   get:
 *     description: Get a specific comment with Id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Comment Id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Specific comment by Id.
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             comment:
 *               type: string
 *             comment_user:
 *               type: string
 *             publication_date:
 *               type: Date
 *             deleted:
 *                 type: boolean
 *             pet_post_id:
 *                 type: string
 *       404:
 *         description: Comment not found.
 */
router.get('/:id', getComment);

/**
 * @swagger
 * /comments:
 *   post:
 *     description: Create and post a new comment and add it to the list of comments.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: tarea
 *         description: Object with comment created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             comment:
 *               type: string
 *             comment_user:
 *               type: string
 *             publication_date:
 *               type: Date
 *             deleted:
 *                 type: boolean
 *             pet_post_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment created
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             comment:
 *               type: string
 *             comment_user:
 *               type: string
 *             publication_date:
 *               type: Date
 *             deleted:
 *                 type: boolean
 *             pet_post_id:
 *                 type: string
 *       400:
 *         description: Invalid input data.
 */
router.post('', express.json(), postComment);

/**
 * @swagger
 * /comments/id:
 *   delete:
 *     description: Remove a specific comment by Id from the list.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Comment Id.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *       404:
 *         description: Comment not found.
 *       400:
 *         description: Internal Server Error.
 */
router.delete('/:id', deleteComment);

module.exports = router;