const { Product } = require('../models');

module.exports = {
  // Criar um novo produto
  async createProduct(data) {
    try {
      const newProduct = await Product.create(data);
      return newProduct;
    } catch (error) {
      throw new Error('Erro ao criar o produto: ' + error.message);
    }
  },

  // Listar todos os produtos
  async getProducts() {
    try {
      const products = await Product.findAll();
      console.log('Produtos cadastrados:', products);
      return products;
    } catch (error) {
      throw new Error('Erro ao listar os produtos: ' + error.message);
    }
  },

  // Atualizar um produto existente
  async updateProduct(id, data) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Produto não encontrado');
      }
      await product.update(data);
      return product;
    } catch (error) {
      throw new Error('Erro ao atualizar o produto: ' + error.message);
    }
  },

  // Deletar um produto existente
  async deleteProduct(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Produto não encontrado');
      }
      await product.destroy();
      return { message: 'Produto deletado com sucesso' };
    } catch (error) {
      throw new Error('Erro ao deletar o produto: ' + error.message);
    }
  },

  // Deletar todos os produtos
  async deleteAllProducts() {
    try {
      const deletedCount = await Product.destroy({ where: {}, truncate: true });
      if (deletedCount === 0) {
        console.log('Nenhum produto encontrado para deletar.');
      }
    } catch (error) {
      throw new Error('Erro ao deletar todos os produtos: ' + error.message);
    }
  }
};
