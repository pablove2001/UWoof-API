const express = require('express');
const router = express.Router();
const { getMessages, getMessage, postMessage, deleteMessage } = require('./../controllers/messages');

/**
 * @swagger
 * /messages:
 *   get:
 *     description: List of messages from mongodb.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: list of messages.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get a list of messages in our db.
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             user:
 *               type: string
 *             publication_date:
 *               type: Date
 *             chat_id:
 *               type: string
 *             message:
 *                 type: string
 *             deleted:
 *                 type: boolean
 *             status: 
 *                 type: string
 *       400:
 *         description: Something went wrong.
 */
router.get('', getMessages);

/**
 * @swagger
 * /message/id:
 *   get:
 *     description: Get a specific message with Id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Message Id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Specific message by Id.
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             user:
 *               type: string
 *             publication_date:
 *               type: Date
 *             chat_id:
 *               type: string
 *             message:
 *                 type: string
 *             deleted:
 *                 type: boolean
 *             status: 
 *                 type: string
 *       404:
 *         description: Message not found.
 */
router.get('/:id', getMessage);

/**
 * @swagger
 * /messages:
 *   post:
 *     description: Create and post a new message and add it to the list of message.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: tarea
 *         description: Object with message created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: string
 *             publication_date:
 *               type: Date
 *             chat_id:
 *               type: string
 *             message:
 *                 type: string
 *             deleted:
 *                 type: boolean
 *             status: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Message created
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             user:
 *               type: string
 *             publication_date:
 *               type: Date
 *             chat_id:
 *               type: string
 *             message:
 *                 type: string
 *             deleted:
 *                 type: boolean
 *             status: 
 *                 type: string
 *       400:
 *         description: Invalid input data.
 */
router.post('', express.json(), postMessage);

/**
 * @swagger
 * /messages/id:
 *   delete:
 *     description: Remove a specific message by Id from the list.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Message Id.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully.
 *       404:
 *         description: Message not found.
 *       400:
 *         description: Internal Server Error.
 */
router.delete('/:id', deleteMessage);

module.exports = router;