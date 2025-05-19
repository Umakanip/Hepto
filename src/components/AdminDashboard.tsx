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
  const [product, setProduct] = useState({ name: '', price: '', brand: '', description: '' });

  const handleChange = (e:any) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    await API.post('/products/addproduct', product, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Product Added');
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

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Product
          </Button>
        </Box>
      </Paper>
    </Box>
  
  );
}
