const cartService = require('../services/cartService');

module.exports = {
  // Adiciona um produto ao carrinho
  async addToCart(req, res) {
    const { productId, quantidade } = req.body;
    const userId = req.user.id;

    try {
      const cartItem = await cartService.addToCart(userId, productId, quantidade);
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Remove um item do carrinho
  async removeFromCart(req, res) {
    const { id } = req.params;

    try {
      const result = await cartService.removeFromCart(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Visualiza o carrinho de compras
  async getCart(req, res) {
    const userId = req.user.id;

    try {
      const cart = await cartService.getCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
