import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box  } from '@mui/material';

export default function Header() {
  const navigate = useNavigate();
  const username = localStorage.getItem('Name');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

   return (
    <AppBar position="static" elevation={2} sx={{ backgroundColor: '#0d47a1', color: '#fff' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" fontWeight="bold">
            Welcome, {username}
          </Typography>
          <Typography variant="body2">
            Role: {role}
          </Typography>
        </Box>

        <Box display="flex" gap={2} mt={{ xs: 2, sm: 0 }}>
          <Button
            component={Link}
            to="/cart"
            variant="outlined"
            sx={{ textTransform: 'none',borderColor:"white",color:"white" }}
          >
            View Cart
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{ textTransform: 'none' }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
