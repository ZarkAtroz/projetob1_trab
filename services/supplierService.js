// services/supplierService.js
import api from './api';

// Fetch all suppliers
export const fetchSuppliers = async () => {
  try {
    const response = await api.get('/suppliers');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
    throw error;
  }
};

// Create a new supplier
export const createSupplier = async (supplierData) => {
  try {
    const response = await api.post('/suppliers', supplierData);
    return response.data;
  } catch (error) {
    console.error('Failed to create supplier:', error);
    throw error;
  }
};

// Update supplier
export const updateSupplier = async (supplierId, updatedData) => {
  try {
    const response = await api.put(`/suppliers/${supplierId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Failed to update supplier:', error);
    throw error;
  }
};

// Delete supplier
export const deleteSupplier = async (supplierId) => {
  try {
    await api.delete(`/suppliers/${supplierId}`);
  } catch (error) {
    console.error('Failed to delete supplier:', error);
    throw error;
  }
};