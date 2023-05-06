const express = require('express');
const router = express.Router();
const { getUsers, getUser, postUser, putUser, deleteUser, googleLogin } = require('./../controllers/users');

/**
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
 *       404:
 *         description: Usuario no encontrado.
 *       400:
 *         description: Error interno del servidor.
 */
router.get('/:id', getUser);

/**
 * Registra un nuevo usuario en la aplicación
 *
 * @swagger
 * /api/users:
 *   post:
 *     summary: Registra un nuevo usuario en la aplicación
 *     description: Crea un nuevo usuario en la base de datos de la aplicación
 *     requestBody:
 *       description: Datos del nuevo usuario a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               last_name:
 *                 type: string
 *                 description: Apellido del usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del usuario
 *               profile_picture:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de perfil del usuario
 *     responses:
 *       200:
 *         description: Nuevo usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del usuario creado
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario creado
 *                 last_name:
 *                   type: string
 *                   description: Apellido del usuario creado
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario creado
 *                 password:
 *                   type: string
 *                   description: Contraseña del usuario creado (encriptada)
 *                 birthday:
 *                   type: string
 *                   description: Fecha de nacimiento del usuario creado
 *                 profile_picture:
 *                   type: string
 *                   description: URL de la imagen de perfil del usuario creado
 *       400:
 *         description: Error en la validación de los datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando qué dato no es válido
 */
router.post('', express.json(), postUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     description: Actualiza un usuario con el ID especificado en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del usuario a actualizar
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *       - in: body
 *         name: user
 *         description: Campos del usuario a actualizar
 *         required: true
 *     responses:
 *       '200':
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *       '400':
 *         description: Datos de entrada no válidos
 *       '404':
 *         description: Usuario no encontrado
 *       '500':
 *         description: Error interno del servidor
 * */
router.put('/:id', express.json(), putUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user with the specified ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'User deleted successfully'
 *       '400':
 *         description: Invalid request
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 * */
router.delete('/:id', express.json(), deleteUser);

router.post('/login/google', googleLogin);


module.exports = router;