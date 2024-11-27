const { Transaction, User } = require('../models');

module.exports = {
  // Processa um pagamento (pode ser cartão de crédito ou PIX)
  async processPayment(userId, valorTotal, metodoPagamento) {
    try {
      // Verifica se o usuário existe
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Valida o valor total
      if (valorTotal <= 0) {
        throw new Error('O valor total deve ser maior que zero');
      }

      // Cria uma transação
      const transaction = await Transaction.create({
        userId,
        valorTotal,
        metodoPagamento,
        status: 'pendente', // Status inicial pode ser pendente
      });

      // Simulação de integração com provedores de pagamento
      // Aqui você poderia adicionar uma lógica real, como APIs externas

      // Simulação de sucesso de pagamento
      transaction.status = 'concluído';
      await transaction.save();

      return transaction;
    } catch (error) {
      throw new Error(error.message || 'Erro ao processar o pagamento');
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
      throw new Error(error.message || 'Erro ao obter o status da transação');
    }
  },
};