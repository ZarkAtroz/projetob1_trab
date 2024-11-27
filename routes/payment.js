// routes/payment.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken } = require('../auth'); // Importa o middleware de autenticação
const { body, param } = require('express-validator');

// Protege as rotas de pagamento com o middleware JWT
router.post('/credit-card',
    verifyToken,
    body('valorTotal').isFloat({ gt: 0 }).withMessage('O valor total deve ser maior que zero.'),
    paymentController.processCreditCardPayment
);

router.post('/pix',
    verifyToken,
    body('valorTotal').isFloat({ gt: 0 }).withMessage('O valor total deve ser maior que zero.'),
    paymentController.processPixPayment
);

router.get('/status/:transactionId',
    verifyToken,
    param('transactionId').isInt().withMessage('O ID da transação deve ser um número inteiro.'),
    paymentController.getTransactionStatus
);

module.exports = router;
