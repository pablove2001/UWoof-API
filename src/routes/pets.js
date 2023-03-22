const express = require('express');
const router = express.Router();
const { getPets, getPet, postPet, putPet, deletePet } = require('./../controllers/pets');

/**
 * Obtiene todos los animales de compañía no eliminados y cuyo propósito no se ha logrado.
 *
 * @swagger
 * /pets:
 *   get:
 *     summary: Obtiene todos los animales de compañía no eliminados y cuyo propósito no se ha logrado.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna todos los animales de compañía no eliminados y cuyo propósito no se ha logrado.
 *         schema:
 *           type: array
 *       400:
 *         description: Algo salió mal al procesar la solicitud.
 */
router.get('', getPets);

/**
 * Obtiene un animal de compañía según su identificador de base de datos.
 *
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Obtiene un animal de compañía según su identificador de base de datos.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID del animal de compañía a obtener.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Retorna el animal de compañía solicitado.
 *       404:
 *         description: El animal de compañía no fue encontrado.
 */
router.get('/:id', getPet);

/**
 * Crea un nuevo animal de compañía.
 *
 * @swagger
 * /pets:
 *   post:
 *     summary: Crea un nuevo animal de compañía.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Información del animal de compañía a crear.
 *         required: true
 *     responses:
 *       200:
 *         description: Retorna el animal de compañía creado.
 *       400:
 *         description: Datos de entrada inválidos.
 */
router.post('', express.json(), postPet);

/**
 * Actualiza un animal de compañía existente.
 *
 * @swagger
 * /pets/{id}:
 *   put:
 *     summary: Actualiza un animal de compañía existente.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID del animal de compañía a actualizar.
 *         in: path
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Información del animal de compañía a actualizar.
 *         required: true
 *     responses:
 *       200:
 *         description: Retorna el animal de compañía actualizado.
 *       400:
 *         description: Datos de entrada inválidos.
 *       404:
 *         description: El animal de compañía no fue encontrado.
 */
router.put('/:id', express.json(), putPet);

/**
 * Elimina un animal de compañía existente.
 *
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Elimina un animal de compañía existente.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID del animal de compañía a eliminar.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: El animal de compañía fue eliminado correctamente.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Pet deleted successfully
 *       400:
 *         description: Error interno del servidor.
 *       404:
 *         description: El animal de compañía no fue encontrado.
 */
router.delete('/:id', deletePet);


module.exports = router;