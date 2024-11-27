const productService = require('../services/productService');
const { validationResult } = require('express-validator');

module.exports = {
  // Criar um novo produto
  async createProduct(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, descricao, preco, estoque } = req.body;

    try {
      const newProduct = await productService.createProduct({ nome, descricao, preco, estoque });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Erro ao criar produto:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno ao criar produto.' });
    }
  },

  // Listar todos os produtos
  async getProducts(req, res) {
    try {
      const products = await productService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error('Erro ao listar produtos:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno ao listar produtos.' });
    }
  },

  // Atualizar um produto existente
  async updateProduct(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { nome, descricao, preco, estoque } = req.body;

    try {
      const updatedProduct = await productService.updateProduct(id, { nome, descricao, preco, estoque });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno ao atualizar produto.' });
    }
  },

  // Deletar um produto existente
  async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      const deleted = await productService.deleteProduct(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }
      res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar produto:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno ao deletar produto.' });
    }
  },

  // Deletar todos os produtos
  async deleteAllProducts(req, res) {
    try {
      await productService.deleteAllProducts();
      res.status(200).json({ message: 'Todos os produtos foram deletados com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar todos os produtos:', error.message);
      res.status(500).json({ error: error.message || 'Erro ao deletar todos os produtos.' });
    }
  }
};
