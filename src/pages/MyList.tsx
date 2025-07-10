import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { useMovieList } from '../context/MovieListContext';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/movieTypes';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MyList: React.FC = () => {
    const { state } = useMovieList();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (state.myList.length === 0) {
        return (
            <Box sx={{ 
                p: 3, 
                mt: 8, 
                textAlign: 'center',
                backgroundColor: '#121212',
                minHeight: 'calc(100vh - 64px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <FavoriteIcon sx={{ fontSize: 60, color: '#ff4444', mb: 2 }} />
                <Typography 
                    variant={isMobile ? 'h5' : 'h4'} 
                    sx={{ color: '#ff4444', mb: 2 }}
                >
                    Your Movie List is Empty
                </Typography>
                <Typography 
                    variant={isMobile ? 'body2' : 'body1'} 
                    sx={{ color: '#ddd', maxWidth: 500 }}
                >
                    Start building your collection by adding movies from the Home page
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            p: isMobile ? 2 : 3, 
            mt: isMobile ? 6 : 8,
            backgroundColor: '#121212',
            minHeight: 'calc(100vh - 64px)'
        }}>
            <Typography 
                variant={isMobile ? 'h4' : 'h3'} 
                gutterBottom 
                sx={{ 
                    color: '#ff4444',
                    fontWeight: 'bold',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <FavoriteIcon fontSize="large" />
                My Movie List
            </Typography>
            <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: isMobile ? 1 : 2,
                justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
                {state.myList.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie as Movie}
                        onClick={() => navigate(`/movie/${movie.id}`)}
                        showAddToList={false}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default MyList;