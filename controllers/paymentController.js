const paymentService = require('../services/paymentService');

module.exports = {
  async processCreditCardPayment(req, res) {
    const { valorTotal } = req.body;
    const userId = req.user.id;

    try {
      const transaction = await paymentService.processPayment(userId, valorTotal, 'cartão de crédito');
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async processPixPayment(req, res) {
    const { valorTotal } = req.body;
    const userId = req.user.id;

    try {
      const transaction = await paymentService.processPayment(userId, valorTotal, 'PIX');
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getTransactionStatus(req, res) {
    const { transactionId } = req.params;

    try {
      const transaction = await paymentService.getTransactionStatus(transactionId);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
