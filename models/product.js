module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Validação para garantir que o nome não esteja vazio
      },
    },
    descricao: {
      type: DataTypes.STRING,
      defaultValue: '', // Valor padrão como string vazia se não for fornecida
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0, // O preço não pode ser negativo
      },
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, // O estoque não pode ser negativo
      },
    }
  });

  // Associações
  Product.associate = (models) => {
    Product.hasMany(models.CartItem, {
      foreignKey: 'productId',
      as: 'cartItems',
    });
  };

  // Método para diminuir o estoque
  Product.decreaseStock = async function (productId, quantidade) {
    const product = await Product.findByPk(productId);
    if (!product || product.estoque < quantidade) {
      return false; // Estoque insuficiente ou produto não encontrado
    }
    product.estoque -= quantidade;
    await product.save();
    return true;
  };

  // Hook para auditoria
  Product.beforeUpdate(async (product, options) => {
    console.log(`Produto atualizado: ${product.id} - Estoque: ${product.estoque}`);
  });

  return Product;
};
