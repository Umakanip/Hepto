import React from 'react';
import { Box, Typography,Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface Product {
  image: any;
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
        display: 'flex',             // horizontal layout
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 1,
        width: {
          xs: '100%',   // full width on mobile
          sm: '90%',    // almost full on small
          md: '45%',    // 2 per row on medium+
          lg: '30%',    // 3 per row on large
        },
        bgcolor: 'background.paper',
        transition: 'transform 0.2s',
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.03)',
        },
        minHeight: 180,
        overflow: 'hidden',
      }}
    >
      {/* Image container, 50% width */}
      <Box
        sx={{
          flex: '1 1 50%',
          maxWidth: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          p: 1,
        }}
      >
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${product.image}`}
          alt={product.name}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </Box>

      {/* Details container, 50% width */}
      <Box
        sx={{
          flex: '1 1 50%',
          maxWidth: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Typography variant="h6" component="h3" noWrap>
          {product.name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {product.brand}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          ₹{product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mt: 1 }}>
          {product.description ? product.description : 'No description'}
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleAddToCart(product)}>
          Add to Cart
        </Button>
      </Box>
    </Box>
  ))}
</Box>

  );
}
