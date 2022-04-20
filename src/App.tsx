import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { ProductList } from './features/products/ProductList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Recruitment Task
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
        <ProductList />
      </header>
    </div>
  );
}

export default App;
