const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { body, param } = require('express-validator');

// Criar um novo produto
router.post('/',
    body('nome').notEmpty().withMessage('O nome do produto é obrigatório.'),
    body('preco').isFloat({ gt: 0 }).withMessage('O preço deve ser um número maior que zero.'),
    body('estoque').isInt({ min: 0 }).withMessage('O estoque deve ser um número inteiro não negativo.'),
    productController.createProduct
);

// Listar todos os produtos
router.get('/', productController.getProducts);

// Atualizar um produto existente
router.put('/:id',
    param('id').isInt().withMessage('O ID do produto deve ser um número inteiro.'),
    body('nome').optional().notEmpty().withMessage('O nome do produto não pode estar vazio.'),
    body('preco').optional().isFloat({ gt: 0 }).withMessage('O preço deve ser um número maior que zero.'),
    body('estoque').optional().isInt({ min: 0 }).withMessage('O estoque deve ser um número inteiro não negativo.'),
    productController.updateProduct
);

// Remover um produto
router.delete('/:id',
    param('id').isInt().withMessage('O ID do produto deve ser um número inteiro.'),
    productController.deleteProduct
);

module.exports = router;
