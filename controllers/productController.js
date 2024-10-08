const { Product } = require('../models');

module.exports = {
  // Criar um novo produto
  async createProduct(req, res) {
    const { nome, descricao, preco, estoque } = req.body;

    // Validação básica de entrada
    if (!nome || preco === undefined || estoque === undefined) {
      return res.status(400).json({ error: 'Nome, preço e estoque são obrigatórios.' });
    }

    try {
      const product = await Product.create({ nome, descricao, preco, estoque });
      res.status(201).json(product);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao criar produto' });
    }
  },

  // Listar todos os produtos
  async getProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao listar produtos' });
    }
  },

  // Atualizar um produto
  async updateProduct(req, res) {
    const { id } = req.params;
    const { nome, descricao, preco, estoque } = req.body;

    try {
      // Verificar se o produto existe
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Atualizar o produto
      await Product.update({ nome, descricao, preco, estoque }, { where: { id } });
      res.status(200).json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao atualizar produto' });
    }
  },

  // Deletar um produto
  async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      // Verificar se o produto existe
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Deletar o produto
      await Product.destroy({ where: { id } });
      res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao deletar produto' });
    }
  },
};
