import React, { useEffect, useState } from 'react';
import API from '../api';
import ProductList from './ProductList'; // card UI component from before
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slider,
  Typography,
  Button,
} from '@mui/material';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image:any;
  description: string | null;
}

export default function UserDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Filters
  const [searchName, setSearchName] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]); // min and max price slider

  // Get unique brands for filter dropdown
  const brands = Array.from(new Set(products.map((p) => p.brand)));

  useEffect(() => {
    API.get('/products/allproduct').then((res) => {
      // console.log(res.data)
      setProducts(res.data);
      setFilteredProducts(res.data);
      // Set price range dynamically based on products
      const prices = res.data.map((p: Product) => p.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setPriceRange([minPrice, maxPrice]);
    });
  }, []);

  useEffect(() => {
    // Filter products whenever filters change
    let filtered = products;

    if (searchName.trim() !== '') {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (selectedBrand !== '') {
      filtered = filtered.filter((p) => p.brand === selectedBrand);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [searchName, selectedBrand, priceRange, products]);

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceRange(newValue);
    }
  };

  const resetFilters = () => {
    setSearchName('');
    setSelectedBrand('');
    const prices = products.map((p) => p.price);
    setPriceRange([Math.min(...prices), Math.max(...prices)]);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" mb={3}>
       Products
      </Typography>

      {/* Filters */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4,
          alignItems: 'center',
        }}
      >
        {/* Product name search */}
        <TextField
          label="Search Product"
          variant="outlined"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          sx={{ minWidth: 200 }}
        />

        {/* Brand filter */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="brand-select-label">Brand</InputLabel>
          <Select
            labelId="brand-select-label"
            value={selectedBrand}
            label="Brand"
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {brands.map((brand) => (
              <MenuItem key={brand} value={brand}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price range slider */}
        <Box sx={{ minWidth: 250 }}>
          <Typography gutterBottom>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={Math.min(...products.map(p => p.price))}
            max={Math.max(...products.map(p => p.price))}
          />
        </Box>

        <Button variant="outlined" onClick={resetFilters}>
          Reset Filters
        </Button>
      </Box>

      {/* Product list */}
      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} />
      ) : (
        <Typography>No products found with these filters.</Typography>
      )}
    </Box>
  );
}
