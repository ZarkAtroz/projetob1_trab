const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../auth'); // Importa o middleware de autenticação
const { body, param } = require('express-validator');

// Adicionar itens ao carrinho
router.post('/add-item',
    verifyToken,
    body('productId').isInt().withMessage('O ID do produto deve ser um número inteiro.'),
    body('quantidade').isInt({ gt: 0 }).withMessage('A quantidade deve ser um número inteiro positivo.'),
    cartController.addToCart
);

// Remover itens do carrinho
router.delete('/remove-item/:id',
    verifyToken,
    param('id').isInt().withMessage('O ID do item deve ser um número inteiro.'),
    cartController.removeFromCart
);

// Recuperar o carrinho do usuário logado
router.get('/', verifyToken, cartController.getCart);

module.exports = router;