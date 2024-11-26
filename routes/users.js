// Importar dependências
var express = require('express');
var router = express.Router();
const auth = require('../auth');

// Importar UserService e UserController
const db = require('../models');
const UserService = require('../services/userService');
const UserController = require('../controllers/userController');

// Instanciar UserService e UserController
const userService = new UserService(db.User);
const userController = new UserController(userService);

// Rota principal do módulo de usuários
router.get('/', function(req, res) {
    res.send('Módulo de usuários rodando.');
});

// Rota para login
router.post('/login', async (req, res) => {
    userController.login(req, res);
});

// Rota para registrar novo usuário
router.post('/novouser', async (req, res) => {
    userController.createUser(req, res);
});

// Rota para retornar todos os usuários
router.get('/allusers', auth.verifyToken, async (req, res) => {
    userController.findAllUsers(req, res);
});

// Rota para retornar um usuário por ID
router.get('/:id', auth.verifyToken, async (req, res) => {
    userController.findUserByPk(req, res);
});

module.exports = router;
