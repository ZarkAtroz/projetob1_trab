const { Transaction } = require('../models');

module.exports = {
  // Processa um pagamento (pode ser cartão de crédito ou PIX)
  async processPayment(userId, valorTotal, metodoPagamento) {
    try {
      // Cria uma transação
      const transaction = await Transaction.create({
        userId,
        valorTotal,
        metodoPagamento,
        status: 'pendente', // Status inicial pode ser pendente
      });

      // Aqui você pode adicionar a lógica de integração com provedores de pagamento

      // Simulação de sucesso de pagamento (por enquanto definimos como concluído)
      transaction.status = 'concluído';
      await transaction.save();

      return transaction;
    } catch (error) {
      throw new Error('Erro ao processar o pagamento');
    }
  },

  // Obtém o status de uma transação
  async getTransactionStatus(transactionId) {
    try {
      const transaction = await Transaction.findByPk(transactionId);
      if (!transaction) {
        throw new Error('Transação não encontrada');
      }
      return transaction;
    } catch (error) {
      throw new Error('Erro ao consultar status da transação');
    }
  },
};
