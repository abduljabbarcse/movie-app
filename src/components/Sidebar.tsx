import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  useMediaQuery,
  useTheme,
  IconButton,
  Divider,
  Box
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  mobileOpen?: boolean;
  handleDrawerToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const drawerWidth = isMobile ? '100%' : 240;

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    marginTop: isMobile ? 0 : '64px',
                    backgroundColor: '#121212',
                    color: '#fff',
                    borderRight: '1px solid rgba(255, 0, 0, 0.12)'
                },
            }}
        >
            {isMobile && (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: theme.spacing(1),
                    backgroundColor: 'rgba(255, 0, 0, 0.1)'
                }}>
                    <IconButton onClick={handleDrawerToggle} sx={{ color: '#ff4444' }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
            )}
            <List>
                <ListItem disablePadding>
                    <ListItemButton 
                        onClick={() => {
                            navigate('/');
                            if (isMobile && handleDrawerToggle) handleDrawerToggle();
                        }}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255, 0, 0, 0.1)'
                            },
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                borderLeft: '3px solid #ff4444'
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: '#ff4444' }}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Home" 
                            primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                </ListItem>
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                <ListItem disablePadding>
                    <ListItemButton 
                        onClick={() => {
                            navigate('/my-list');
                            if (isMobile && handleDrawerToggle) handleDrawerToggle();
                        }}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255, 0, 0, 0.1)'
                            },
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                borderLeft: '3px solid #ff4444'
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: '#ff4444' }}>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary="My List" 
                            primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;