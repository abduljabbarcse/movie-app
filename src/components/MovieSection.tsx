import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import MovieCard from './MovieCard';
import type { Movie } from '../types/movieTypes';

interface MovieSectionProps {
    title: string;
    movies: Movie[];
    onMovieClick: (movieId: number) => void;
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movies, onMovieClick }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" color="white" gutterBottom sx={{ ml: 2 }}>
                {title}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: isSmallScreen ? 'nowrap' : 'wrap',
                    overflowX: isSmallScreen ? 'auto' : 'visible',
                    gap: 2,
                    py: 2,
                    px: 2,
                    justifyContent: isSmallScreen ? 'flex-start' : 'center',
                }}
            >
                {movies.map((movie) => (
                    <Box
                        key={movie.id}
                        sx={{
                            flex: isSmallScreen ? '0 0 auto' : '1 0 21%',
                            minWidth: isSmallScreen ? 160 : 'auto',
                            maxWidth: isSmallScreen ? 200 : 'auto',
                        }}
                    >
                        <MovieCard movie={movie} onClick={() => onMovieClick(movie.id)} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default MovieSection;
