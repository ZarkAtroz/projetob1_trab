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
          model: 'Users', // Tabela de referência
          key: 'id',
        },
        onDelete: 'CASCADE', // Se um usuário for deletado, suas transações também são
      },
      valorTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
        defaultValue: 'pendente', // O status começa como pendente e pode ser atualizado.
      },
    });
  
    // Associações
    Transaction.associate = (models) => {
      Transaction.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };
  
    return Transaction;
  };
  