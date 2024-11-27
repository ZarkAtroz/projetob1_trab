module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
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
  });

  // Associações
  Cart.associate = (models) => {
      Cart.hasMany(models.CartItem, {
          foreignKey: 'cartId',
          as: 'itens',
      });
      Cart.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
      });
  };

  // Métodos customizados
  Cart.addItem = async function (cartId, productId, quantidade) {
      const cartItem = await sequelize.models.CartItem.findOne({ where: { cartId, productId } });
      if (cartItem) {
          cartItem.quantidade += quantidade;
          cartItem.precoTotal = cartItem.quantidade * (await sequelize.models.Product.findByPk(productId)).preco;
          await cartItem.save();
      } else {
          await sequelize.models.CartItem.create({ cartId, productId, quantidade });
      }
  };

  Cart.removeItem = async function (cartId, productId) {
      const cartItem = await sequelize.models.CartItem.findOne({ where: { cartId, productId } });
      if (cartItem) {
          const product = await sequelize.models.Product.findByPk(productId);
          if (product) {
              product.estoque += cartItem.quantidade;
              await product.save();
          }
          await cartItem.destroy();
      }
  };

  return Cart;
};
