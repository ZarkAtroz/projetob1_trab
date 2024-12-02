module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true, // Validação para garantir que o nome não esteja vazio
          },
      },
      contact: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      address: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true, // Garante que o e-mail seja único
          validate: {
              isEmail: true, // Verifica se o e-mail é válido
          },
      },
      phone: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  });

  // Métodos customizados para validação e segurança
  Supplier.prototype.toJSON = function () {
      const values = { ...this.get() };
      return values;
  };

  Supplier.associate = (models) => {
      if (models.Product) {
          Supplier.hasMany(models.Product, {
              foreignKey: 'supplierId',
              as: 'products',
          });
      }
  };

  return Supplier;
};
