const express = require('express');
const router = express.Router();
const { getChats, getChat, postChat, deleteChat } = require('./../controllers/chats');

/**
 * @swagger
 * /chats:
 *   get:
 *     description: List of chats from mongodb.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: list of chats.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get a list of chats in our db.
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             deleted:
 *               type: boolean
 *             owner_user_id:
 *               type: string
 *             interested_user_id:
 *               type: string
 *             creation_date:
 *                 type: Date
 *       400:
 *         description: Something went wrong.
 */
router.get('', getChats);

/**
 * @swagger
 * /chats/id:
 *   get:
 *     description: Get a specific chat with Id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Chat Id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Specific chat by Id.
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             deleted:
 *               type: boolean
 *             owner_user_id:
 *               type: string
 *             interested_user_id:
 *               type: string
 *             creation_date:
 *                 type: Date
 *       404:
 *         description: Chat not found.
 */
router.get('/:id', getChat);

/**
 * @swagger
 * /chats:
 *   post:
 *     description: Create and post a new chat and add it to the list of chats.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: tarea
 *         description: Object with chat created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             deleted:
 *               type: boolean
 *             owner_user_id:
 *               type: string
 *             interested_user_id:
 *               type: string
 *             creation_date:
 *                 type: Date
 *     responses:
 *       200:
 *         description: Chat created
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             deleted:
 *               type: boolean
 *             owner_user_id:
 *               type: string
 *             interested_user_id:
 *               type: string
 *             creation_date:
 *                 type: Date
 *       400:
 *         description: Invalid input data.
 */
router.post('', express.json(), postChat);

/**
 * @swagger
 * /chats/id:
 *   delete:
 *     description: Remove a specific chat by Id from the list.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Chat Id.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Chat deleted successfully.
 *       404:
 *         description: Chat not found.
 *       400:
 *         description: Internal Server Error.
 */
router.delete('/:id', deleteChat);

module.exports = router;