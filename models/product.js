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
  
    return Product;
  };
  