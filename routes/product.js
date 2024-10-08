const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Remova o prefixo /products aqui, pois ele já é adicionado no app.js
router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
