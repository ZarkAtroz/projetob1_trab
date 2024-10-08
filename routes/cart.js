const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../auth'); // Importa o middleware de autenticação

// Protege as rotas de carrinho de compras com o middleware JWT
router.post('/add', verifyToken, cartController.addToCart);
router.delete('/remove/:id', verifyToken, cartController.removeFromCart);
router.get('/', verifyToken, cartController.getCart); // Remove o parâmetro :userId da rota

module.exports = router;
