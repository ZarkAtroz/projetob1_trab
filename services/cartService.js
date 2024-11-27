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

      // Verifica se há estoque suficiente
      if (product.estoque < quantidade) {
        throw new Error('Estoque insuficiente para o produto');
      }

      // Verifica se o carrinho já existe para o usuário
      let cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        cart = await Cart.create({ userId });
      }

      // Verifica se o item já está no carrinho
      let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
      if (cartItem) {
        cartItem.quantidade += quantidade;
        cartItem.precoTotal = cartItem.quantidade * product.preco;
        await cartItem.save();
      } else {
        // Cria um novo item no carrinho
        cartItem = await CartItem.create({
          cartId: cart.id,
          productId,
          quantidade,
          precoTotal: quantidade * product.preco,
        });
      }

      // Atualiza o estoque do produto
      product.estoque -= quantidade;
      await product.save();

      return cartItem;
    } catch (error) {
      throw new Error(error.message || 'Erro ao adicionar produto ao carrinho');
    }
  },

  // Remove um item do carrinho
  async removeFromCart(userId, productId) {
    try {
      // Busca o carrinho do usuário
      const cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        throw new Error('Carrinho não encontrado');
      }

      // Busca o item no carrinho
      const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
      if (!cartItem) {
        throw new Error('Item não encontrado no carrinho');
      }

      // Atualiza o estoque do produto
      const product = await Product.findByPk(productId);
      if (product) {
        product.estoque += cartItem.quantidade;
        await product.save();
      }

      // Remove o item do carrinho
      await cartItem.destroy();
      return true;
    } catch (error) {
      throw new Error(error.message || 'Erro ao remover produto do carrinho');
    }
  },

  // Visualizar o carrinho
  async getCart(userId) {
    try {
      const cart = await Cart.findOne({
        where: { userId },
        include: [
          {
            model: CartItem,
            as: 'itens',
            include: [{ model: Product, as: 'product' }],
          },
        ],
      });

      if (!cart) {
        throw new Error('Carrinho não encontrado');
      }

      return cart;
    } catch (error) {
      throw new Error(error.message || 'Erro ao obter o carrinho');
    }
  },
};