const cartService = require('../services/cartService');
const { validationResult } = require('express-validator');

module.exports = {
  // Adicionar um produto ao carrinho
  async addToCart(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, quantidade } = req.body;
    const userId = req.user.id;

    try {
      const cartItem = await cartService.addToCart(userId, productId, quantidade);
      res.status(201).json(cartItem);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno ao adicionar ao carrinho.' });
    }
  },

  // Remover um item do carrinho
  async removeFromCart(req, res) {
  const { id: productId } = req.params; // Supondo que id seja o productId
  const userId = req.user.id;

  try {
    const result = await cartService.removeFromCart(userId, productId);
    if (!result) {
      return res.status(404).json({ error: 'Item não encontrado no carrinho.' });
    }
    res.status(200).json({ message: 'Item removido do carrinho com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover do carrinho:', error.message);
    res.status(500).json({ error: error.message || 'Erro interno ao remover do carrinho.' });
  }
},

  // Visualizar o carrinho
  async getCart(req, res) {
    const userId = req.user.id;

    try {
      const cart = await cartService.getCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      console.error('Erro ao visualizar o carrinho:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno ao visualizar o carrinho.' });
    }
  },
};