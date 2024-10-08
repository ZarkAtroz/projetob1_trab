const { Cart, CartItem, Product } = require('../models');

module.exports = {
  // Adiciona um produto ao carrinho de um usuário
  async addToCart(userId, productId, quantidade) {
    try {
      // Verifica se o produto existe
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error('Produto não encontrado');
      }

      // Verifica se o carrinho já existe para o usuário
      let cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        cart = await Cart.create({ userId });
      }

      // Calcula o preço total
      const precoTotal = product.preco * quantidade;

      // Adiciona o produto ao carrinho
      const cartItem = await CartItem.create({
        cartId: cart.id,
        productId,
        quantidade,
        precoTotal,
      });

      return cartItem;
    } catch (error) {
      throw new Error('Erro ao adicionar produto ao carrinho');
    }
  },

  // Remove um item do carrinho
  async removeFromCart(cartItemId) {
    try {
      const cartItem = await CartItem.findByPk(cartItemId);
      if (!cartItem) {
        throw new Error('Item do carrinho não encontrado');
      }

      await cartItem.destroy();
      return { message: 'Item removido do carrinho com sucesso' };
    } catch (error) {
      throw new Error('Erro ao remover item do carrinho');
    }
  },

  // Obtém o carrinho de compras de um usuário
  async getCart(userId) {
    try {
      const cart = await Cart.findOne({
        where: { userId },
        include: {
          model: CartItem,
          as: 'itens',
          include: { model: Product, attributes: ['nome', 'preco'] },
        },
      });

      if (!cart || cart.itens.length === 0) {
        return { message: 'Carrinho vazio' };
      }

      return cart;
    } catch (error) {
      throw new Error('Erro ao visualizar o carrinho');
    }
  },
};
