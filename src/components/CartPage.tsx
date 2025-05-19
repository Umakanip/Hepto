// src/components/CartPage.tsx
import { useCart } from '../context/CartContext';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>🛒 Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography>No products in cart</Typography>
      ) : (
        cart.map((product) => (
          <Card key={product.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">{product.brand}</Typography>
              <Typography>₹{product.price}</Typography>
              <Typography>{product.description}</Typography>
              <Button 
                onClick={() => removeFromCart(product.id)} 
                color="error" 
                variant="outlined"
                sx={{ mt: 1 }}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
