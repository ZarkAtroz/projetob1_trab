const bcrypt = require('bcrypt');
const { User } = require('../models');
const ROUND_SALTS = 10;

module.exports = {
  // Criar um novo usuário
  async createUser(nome, email, data_nasc, password) {
    try {
      // Verificar se o e-mail já está registrado
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('O e-mail já está registrado.');
      }
  
      // Criptografar a senha e criar o usuário
      const hashpassword = await bcrypt.hash(password, ROUND_SALTS);
      const newUser = await User.create({
        nome,
        email,
        data_nasc,
        password: hashpassword,
      });
  
      if (newUser) {
        newUser.password = undefined; // Remover a senha do retorno
        return newUser;
      } else {
        return null;
      }
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('O e-mail já está registrado.');
      }
      throw new Error(error.message || 'Erro ao criar usuário.');
    }
  },

  // Atualizar um usuário
  async updateUser(userId, nome, email, data_nasc, password) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      const updates = { nome, email, data_nasc };
      if (password) {
        updates.password = await bcrypt.hash(password, ROUND_SALTS);
      }

      await user.update(updates);
      user.password = undefined; // Remover a senha do retorno
      return user;
    } catch (error) {
      throw new Error(error.message || 'Erro ao atualizar usuário.');
    }
  },

  // Deletar um usuário
  async deleteUser(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      await user.destroy();
      return true;
    } catch (error) {
      throw new Error(error.message || 'Erro ao deletar usuário.');
    }
  },

  // Validar senha
  async validatePassword(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Usuário ou senha inválidos.');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Usuário ou senha inválidos.');
      }

      return user;
    } catch (error) {
      throw new Error(error.message || 'Erro ao validar credenciais.');
    }
  },
};
