// supplier.js (Routes)
const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { verifyToken } = require('../auth'); // Altere para `verifyToken`

// Rotas para fornecedores
router.route('/')
  .get(verifyToken, supplierController.getAllSuppliers)  // Get all suppliers
  .post(verifyToken, supplierController.createSupplier); // Create a new supplier

router.route('/:id')
  .put(verifyToken, supplierController.updateSupplier)   // Update a supplier
  .delete(verifyToken, supplierController.deleteSupplier); // Delete a supplier

module.exports = router;
