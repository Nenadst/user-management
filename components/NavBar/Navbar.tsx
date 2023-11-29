import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          User Management
        </Typography>
        <Button color="inherit">
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
          >
            Home
          </Link>
        </Button>
        <Button color="inherit">
          <Link
            href="/roles"
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
          >
            Roles
          </Link>
        </Button>
        <Button color="inherit">
          <Link
            href="/users"
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
          >
            Users
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
