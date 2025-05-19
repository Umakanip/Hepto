import React from 'react';
import { Box, Typography,Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string | null;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
     const { addToCart } = useCart();
     const navigate = useNavigate();

const handleAddToCart = (product: Product) => {
  addToCart(product);
  navigate('/cart'); // Navigate after adding
};
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center',
      }}
    >
      {products.map((product) => (
        <Box
          key={product.id}
          sx={{
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 1,
            padding: 2,
            width: {
              xs: '100%',   // full width on mobile
              sm: '45%',    // 2 per row on small screens
              md: '30%',    // 3 per row on medium+
            },
            bgcolor: 'background.paper',
            transition: 'transform 0.2s',
            '&:hover': {
              boxShadow: 4,
              transform: 'scale(1.03)',
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 180,
          }}
        >
          <Typography variant="h6" component="h3" mb={1} noWrap>
            {product.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            {product.brand}
          </Typography>
          <Typography variant="body1" fontWeight="bold" mb={1}>
            ₹{product.price}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ flexGrow: 1 }}
          >
            {product.description ? product.description : 'No description'}
          </Typography>
           <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </Button>
        </Box>
      ))}
    </Box>
  );
}
