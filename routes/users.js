const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para criar um novo usuário
router.post('/register', 
  body('email').isEmail().withMessage('E-mail inválido'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  userController.createUser
);

// Rota para login do usuário (alteração aqui)
router.post('/login', 
  body('email').isEmail().withMessage('E-mail inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),
  userController.loginUser // Use loginUser em vez de validatePassword
);

// Outras rotas, como listar todos os usuários, atualizar, deletar etc.
router.get('/', userController.findAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
