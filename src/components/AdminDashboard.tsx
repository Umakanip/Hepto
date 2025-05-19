import { useState } from 'react';
import API from '../api';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';


export default function AdminDashboard() {
  const [product, setProduct] = useState({ name: '', price: '', brand: '', description: '', image: null as File | null, });

  const handleChange = (e:any) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('price', product.price.toString());
  formData.append('brand', product.brand);
  formData.append('description', product.description);
  if (product.image) {
    formData.append('image', product.image);
  }

  try {
    await API.post('/products/addproduct', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Product Added');
    // Optionally reset form here
    setProduct({ name: '', price: '', brand: '', description: '', image: null });
  } catch (error) {
    alert('Failed to add product');
    console.error(error);
  }
};

  return (
  
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      sx={{ backgroundColor: '#f0f2f5' }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 500,
          borderRadius: 3,
          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
          Add Product
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Product Name"
            name="name"
            variant="outlined"
            fullWidth
            required
            value={product.name}
            onChange={handleChange}
          />
          <TextField
            label="Price"
            name="price"
            variant="outlined"
            type="number"
            fullWidth
            value={product.price}
            onChange={handleChange}
          />
          <TextField
            label="Brand"
            name="brand"
            variant="outlined"
            fullWidth
            value={product.brand}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={product.description}
            onChange={handleChange}
          />
 <input
    accept="image/*"
    type="file"
    id="product-image"
    style={{ display: 'none' }}
    onChange={(e) => {
      if (e.target.files && e.target.files.length > 0) {
        setProduct((prev) => ({ ...prev, image: e.target.files![0] }));
      }
    }}
  />
  <label htmlFor="product-image">
    <Button variant="outlined" component="span" sx={{ mb: 2 }}>
      Upload Image
    </Button>
  </label>

  {product.image && (
    <Box
      component="img"
      src={URL.createObjectURL(product.image)}
      alt="Preview"
      sx={{ width: '100%', maxHeight: 200, objectFit: 'contain', mb: 2, borderRadius: 1 }}
    />
  )}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Product
          </Button>
        </Box>
      </Paper>
    </Box>
  
  );
}
