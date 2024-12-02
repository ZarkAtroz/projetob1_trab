// supplierController.js
const { Supplier } = require('../models');

module.exports = {
  async getAllSuppliers(req, res) {
    try {
      const suppliers = await Supplier.findAll();
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch suppliers' });
    }
  },

  async createSupplier(req, res) {
    try {
      const { name, contact, address, email, phone } = req.body;
      const newSupplier = await Supplier.create({ name, contact, address, email, phone });
      res.status(201).json(newSupplier);
    } catch (error) {
      res.status(500).send({ error: 'Failed to create supplier' });
    }
  },

  async updateSupplier(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const [updated] = await Supplier.update(updatedData, { where: { id } });
      if (updated) {
        const updatedSupplier = await Supplier.findByPk(id);
        res.status(200).json(updatedSupplier);
      } else {
        res.status(404).send({ error: 'Supplier not found' });
      }
    } catch (error) {
      res.status(500).send({ error: 'Failed to update supplier' });
    }
  },

  async deleteSupplier(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Supplier.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send({ error: 'Supplier not found' });
      }
    } catch (error) {
      res.status(500).send({ error: 'Failed to delete supplier' });
    }
  }
};
