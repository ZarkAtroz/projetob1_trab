// routes/payment.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken } = require('../auth'); // Importa o middleware de autenticação

// Protege as rotas de pagamento com o middleware JWT
router.post('/credit-card', verifyToken, paymentController.processCreditCardPayment);
router.post('/pix', verifyToken, paymentController.processPixPayment);
router.get('/status/:transactionId', verifyToken, paymentController.getTransactionStatus);

module.exports = router;
