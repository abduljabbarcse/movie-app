import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'black',
        backgroundImage: 'linear-gradient(to right, black, #1a1a1a)',
        boxShadow: '0 2px 10px rgba(255, 0, 0, 0.3)'
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuToggle}
            sx={{ mr: 2, color: 'red' }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography 
          variant={isMobile ? 'h6' : 'h5'} 
          noWrap 
          component="div"
          sx={{
            flexGrow: 1,
            color: 'red',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            letterSpacing: '1px',
            '&:hover': {
              color: '#ff3333',
              transition: 'color 0.3s ease'
            }
          }}
        >
          Movie Explorer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;