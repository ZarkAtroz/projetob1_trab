module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Garante que o e-mail seja único
            validate: {
                isEmail: true, // Verifica se o e-mail é válido
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 100], // Garante que a senha tenha entre 6 e 100 caracteres
            },
        },
    });

    // Métodos customizados para validação e segurança
    User.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.password; // Remove a senha do objeto retornado
        return values;
    };

    User.associate = (models) => {
        User.hasMany(models.Transaction, {
            foreignKey: 'userId',
            as: 'transactions',
        });

        User.hasOne(models.Cart, {
            foreignKey: 'userId',
            as: 'cart',
        });
    };

    return User;
};
