import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActionArea, 
  IconButton, 
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useMovieList } from '../context/MovieListContext';
import type { Movie } from '../types/movieTypes';

interface MovieCardProps {
    movie: Movie;
    onClick?: () => void;
    showAddToList?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, showAddToList = true }) => {
    const { state, dispatch } = useMovieList();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isInList = state.myList.some(m => m.id === movie.id);

    const handleAddToList = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isInList) {
            dispatch({ type: 'REMOVE_FROM_LIST', payload: movie.id });
        } else {
            dispatch({ type: 'ADD_TO_LIST', payload: movie });
        }
    };

    // Responsive card size
    const getCardWidth = () => {
        if (isSmallScreen) return 150;
        if (isMediumScreen) return 180;
        return 200;
    };

    // Responsive image height
    const getImageHeight = () => {
        if (isSmallScreen) return 225;
        if (isMediumScreen) return 270;
        return 300;
    };

    // Responsive typography
    const getTitleVariant = () => {
        if (isSmallScreen) return 'body1';
        return 'subtitle1';
    };

    return (
        <Card sx={{ 
            width: getCardWidth(), 
            m: 1, 
            position: 'relative',
            backgroundColor: '#121212',
            color: 'white',
            border: '1px solid #333',
            '&:hover': {
                boxShadow: '0 0 15px rgba(255, 0, 0, 0.5)',
                transform: 'scale(1.02)',
                transition: 'all 0.3s ease'
            }
        }}>
            <CardActionArea onClick={onClick}>
                <CardMedia
                    component="img"
                    height={getImageHeight()}
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    sx={{
                        '&:hover': {
                            opacity: 0.9
                        }
                    }}
                />
                <CardContent sx={{ padding: isSmallScreen ? '8px' : '12px' }}>
                    <Typography 
                        gutterBottom 
                        variant={getTitleVariant()} 
                        component="div" 
                        noWrap
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: isSmallScreen ? '0.9rem' : '1rem',
                            '&:hover': {
                                color: '#ff3333'
                            }
                        }}
                    >
                        {movie.title}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{
                            color: '#ff4444',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: isSmallScreen ? '0.8rem' : '0.9rem'
                        }}
                    >
                        ⭐ {movie.vote_average.toFixed(1)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {showAddToList && (
                <Box sx={{ 
                    position: 'absolute', 
                    top: 4, 
                    right: 4,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '50%'
                }}>
                    <IconButton 
                        size={isSmallScreen ? 'small' : 'medium'}
                        onClick={handleAddToList} 
                        aria-label="add to favorites"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255, 0, 0, 0.2)'
                            }
                        }}
                    >
                        {isInList ? (
                            <FavoriteIcon 
                                color="error" 
                                sx={{ fontSize: isSmallScreen ? '1.2rem' : '1.5rem' }} 
                            />
                        ) : (
                            <FavoriteBorderIcon 
                                color="error" 
                                sx={{ fontSize: isSmallScreen ? '1.2rem' : '1.5rem' }} 
                            />
                        )}
                    </IconButton>
                </Box>
            )}
        </Card>
    );
};

export default MovieCard;