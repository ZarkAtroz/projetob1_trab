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
              model: 'Carts', // Tabela associada
              key: 'id',
          },
          onDelete: 'CASCADE',
      },
      productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'Products', // Tabela associada
              key: 'id',
          },
          onDelete: 'CASCADE',
      },
      quantidade: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
              min: 1, // Quantidade mínima permitida
          },
      },
      precoTotal: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
      },
  });

  CartItem.associate = (models) => {
      CartItem.belongsTo(models.Cart, {
          foreignKey: 'cartId',
          as: 'cart',
      });
      CartItem.belongsTo(models.Product, {
          foreignKey: 'productId',
          as: 'product',
      });
  };

  // Hook para calcular precoTotal automaticamente
  CartItem.beforeSave(async (cartItem, options) => {
      const product = await sequelize.models.Product.findByPk(cartItem.productId);
      if (product) {
          cartItem.precoTotal = product.preco * cartItem.quantidade;
      } else {
          throw new Error('Produto não encontrado para cálculo do preço total.');
      }
  });

  return CartItem;
};