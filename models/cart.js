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
      },
    });
  
    Cart.associate = (models) => {
      // Associação com CartItem (um carrinho pode ter muitos itens)
      Cart.hasMany(models.CartItem, {
        foreignKey: 'cartId',
        as: 'itens', // Referência usada nas queries com include
      });
  
      // Se necessário, associação com o modelo User
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    };
  
    return Cart;
  };
  