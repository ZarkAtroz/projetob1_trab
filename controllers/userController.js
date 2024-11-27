const userService = require('../services/userService');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || '123';

module.exports = {
  // Criar um novo usuário
  async createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, data_nasc, password } = req.body;

    try {
      const newUser = await userService.createUser(nome, email, data_nasc, password);
      res.status(201).json(newUser);
    } catch (error) {
      if (error.message === 'O e-mail já está registrado.') {
        return res.status(409).json({ error: error.message });
      }
      console.error('Erro ao criar usuário:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno ao criar usuário.' });
    }
  },

  // Listar todos os usuários
  async findAllUsers(req, res) {
    try {
      const users = await userService.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Erro ao listar usuários:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno ao listar usuários.' });
    }
  },

  // Atualizar um usuário
  async updateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { nome, email, data_nasc, password } = req.body;

    try {
      const updatedUser = await userService.updateUser(id, nome, email, data_nasc, password);
      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno ao atualizar usuário.' });
    }
  },

  // Deletar um usuário
  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const deleted = await userService.deleteUser(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno ao deletar usuário.' });
    }
  },

  // Login de um usuário
  async loginUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await userService.validatePassword(email, password);
      const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      res.status(401).json({ error: error.message || 'Erro ao fazer login.' });
    }
  },
};
