import axios from 'axios';

const API_URL = '/api/';

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}products/`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the products!", error);
        throw error;
    }
};

export const addProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}products/`, product);
        return response.data;
    } catch (error) {
        console.error("There was an error adding the product!", error);
        throw error;
    }
};

export const updateProduct = async (productId, updatedProduct) => {
    try {
        const response = await axios.put(`${API_URL}products/${productId}/`, updatedProduct);
        return response.data;
    } catch (error) {
        console.error("There was an error updating the product!", error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${API_URL}products/${productId}/`);
        return response.data;
    } catch (error) {
        console.error("There was an error deleting the product!", error);
        throw error;
    }
};
