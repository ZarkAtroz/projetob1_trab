const express = require('express');
const router = express.Router();

// Importar rotas principais
const productRoutes = require('./product');
const cartRoutes = require('./cart');
const userRoutes = require('./users');
const paymentRoutes = require('./payment');

// Rota padrão para verificar o status do servidor
router.get('/', function(req, res) {
    res.json({ message: 'API funcionando corretamente.' });
});

// Conectar rotas específicas
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/users', userRoutes);
router.use('/payments', paymentRoutes);

// Adicionar rota para deletar todos os produtos (usada para desenvolvimento/testes)
router.delete('/products/all', async (req, res) => {
    try {
        await productController.deleteAllProducts();
        res.status(200).json({ message: 'Todos os produtos foram deletados com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar todos os produtos:', error.message);
        res.status(500).json({ error: error.message || 'Erro ao deletar todos os produtos.' });
    }
});

module.exports = router;
