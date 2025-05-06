import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SearchInput from 'react-search-input';
import ReactPaginate from 'react-paginate';
import axios from 'axios';  // Import axios for making API calls

const API_URL = 'http://localhost:8000/api/products/';  // API endpoint for fetching products

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', quantity: '' });

  const productsPerPage = 5;

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);  // Make GET request to fetch products
        setProducts(response.data);  // Set the products state
      } catch (error) {
        console.error('There was an error fetching the products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search input
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display products based on current page
  const displayedProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  // Handle page change for pagination
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Handle product deletion
  const handleDelete = (id) => {
    setDeleteProductId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      // Send DELETE request to remove the product
      await axios.delete(`${API_URL}${deleteProductId}/`);
      setProducts(products.filter(product => product.id !== deleteProductId));  // Remove from state
      setShowModal(false);  // Close the modal
    } catch (error) {
      console.error('There was an error deleting the product:', error);
    }
  };

  // Handle adding new product
  const handleAddProduct = async () => {
    try {
      // Send POST request to add the new product
      const response = await axios.post(API_URL, newProduct);
      setProducts([...products, response.data]);  // Add the new product to the list
      setShowAddProductModal(false);  // Close the modal
      setNewProduct({ name: '', description: '', price: '', quantity: '' });  // Reset the form
    } catch (error) {
      console.error('There was an error adding the product:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Product Inventory</h2>

      {/* Add Product Button */}
      <Button variant="success" onClick={() => setShowAddProductModal(true)} className="mb-3">
        Add New Product
      </Button>

      {/* Search Input */}
      <div className="mb-3">
        <SearchInput
          className="form-control"
          onChange={(term) => setSearchTerm(term)}
          placeholder="Search products..."
        />
      </div>

      {/* Product List */}
      <ul className="list-group">
        {displayedProducts.map((product) => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{product.name}</strong>
              <p className="mb-0">{product.description}</p>
            </div>
            <Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <ReactPaginate
        pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination justify-content-center mt-4"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        activeClassName="active"
      />

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Product Modal */}
      <Modal show={showAddProductModal} onHide={() => setShowAddProductModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product quantity"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddProductModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddProduct}>Add Product</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
