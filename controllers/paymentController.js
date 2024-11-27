const paymentService = require('../services/paymentService');
const { validationResult } = require('express-validator');

module.exports = {
  // Processar pagamento com cartão de crédito
  async processCreditCardPayment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { valorTotal } = req.body;
    const userId = req.user.id;

    if (valorTotal <= 0) {
      return res.status(400).json({ error: 'O valor total deve ser maior que zero.' });
    }

    try {
      const transaction = await paymentService.processPayment(userId, valorTotal, 'cartão de crédito');
      res.status(201).json(transaction);
    } catch (error) {
      console.error('Erro ao processar pagamento com cartão de crédito:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno ao processar pagamento.' });
    }
  },

  // Processar pagamento via PIX
  async processPixPayment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { valorTotal } = req.body;
    const userId = req.user.id;

    if (valorTotal <= 0) {
      return res.status(400).json({ error: 'O valor total deve ser maior que zero.' });
    }

    try {
      const transaction = await paymentService.processPayment(userId, valorTotal, 'PIX');
      res.status(201).json(transaction);
    } catch (error) {
      console.error('Erro ao processar pagamento via PIX:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno ao processar pagamento.' });
    }
  },

  // Consultar status da transação
  async getTransactionStatus(req, res) {
    const { transactionId } = req.params;

    try {
      const transaction = await paymentService.getTransactionStatus(transactionId);
      if (!transaction) {
        return res.status(404).json({ error: 'Transação não encontrada.' });
      }
      res.status(200).json(transaction);
    } catch (error) {
      console.error('Erro ao consultar status da transação:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno ao consultar status da transação.' });
    }
  },
};