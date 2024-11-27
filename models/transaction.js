module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'Users', // Tabela associada
              key: 'id',
          },
          onDelete: 'CASCADE',
      },
      valorTotal: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          validate: {
              min: 0.01, // Valor mínimo para evitar transações sem valor
          },
      },
      metodoPagamento: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              isIn: [['cartão de crédito', 'PIX']], // Somente esses métodos de pagamento são válidos
          },
      },
      status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'pendente',
          validate: {
              isIn: [['pendente', 'concluído', 'falhado']], // Status válidos
          },
      },
  });

  // Associações
  Transaction.associate = (models) => {
      Transaction.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
      });
  };

  // Método para atualizar o status da transação
  Transaction.updateStatus = async function (transactionId, status) {
      const validStatuses = ['pendente', 'concluído', 'falhado'];
      if (!validStatuses.includes(status)) {
          throw new Error('Status inválido para transação.');
      }

      const transaction = await Transaction.findByPk(transactionId);
      if (!transaction) {
          throw new Error('Transação não encontrada.');
      }

      transaction.status = status;
      await transaction.save();
      return transaction;
  };

  // Hook para auditoria
  Transaction.beforeUpdate(async (transaction, options) => {
      console.log(`Transação atualizada: ID ${transaction.id}, Status: ${transaction.status}`);
  });

  return Transaction;
};
