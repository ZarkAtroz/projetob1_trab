module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Carts', // Nome da tabela associada
          key: 'id',
        },
        onDelete: 'CASCADE', // Se um carrinho for excluído, os itens também serão
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products', // Nome da tabela associada
          key: 'id',
        },
        onDelete: 'CASCADE', // Se um produto for excluído, os itens relacionados também serão
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precoTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  
    CartItem.associate = (models) => {
      // Associação com o modelo Cart (pertence a um carrinho)
      CartItem.belongsTo(models.Cart, { foreignKey: 'cartId' });
  
      // Associação com o modelo Product (pertence a um produto)
      CartItem.belongsTo(models.Product, { foreignKey: 'productId' });
    };
  
    return CartItem;
  };
  