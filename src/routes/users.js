const express = require('express');
const router = express.Router();
const { getUsers, getUser, postUser, putUser, deleteUser } = require('./../controllers/users');

/**
 * Obtiene una lista de todos los usuarios activos.
 *
 * @swagger
 * /users:
 *   get:
 *     summary: Devuelve una lista de todos los usuarios activos.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de usuarios activos.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *       400:
 *         description: Error interno del servidor.
 */
router.get('', getUsers);

/**
 * Obtiene un usuario específico según el ID proporcionado.
 *
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario específico según el ID proporcionado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario a obtener.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: Usuario no encontrado.
 *       400:
 *         description: Error interno del servidor.
 */
router.get('/:id', getUser);

/**
 * Creates a new user.
 *
 * @swagger
 * /api/users:
 *   post:
 *     summary: Creates a new user.
 *     description: Creates a new user with the given information.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: John
 *             last_name:
 *               type: string
 *               example: Doe
 *             email:
 *               type: string
 *               example: john.doe@example.com
 *             password:
 *               type: string
 *               example: password123
 *             birthday:
 *               type: string
 *               format: date
 *               example: 1990-01-01
 *             profile_picture:
 *               type: string
 *               example: https://example.com/profile.jpg
 *           required:
 *             - name
 *             - last_name
 *             - email
 *             - password
 *     responses:
 *       '200':
 *         description: The created user.
 *         schema:
 *           $ref: '#/definitions/User'
 *       '400':
 *         description: Invalid input data.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Invalid input data
 *           required:
 *             - message
 */
router.post('', express.json(), postUser);


router.put('/:id', express.json(), putUser);

router.delete('/:id', express.json(), deleteUser);


module.exports = router;