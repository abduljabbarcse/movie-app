import React from 'react';
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material';
import MovieSection from '../components/MovieSection';
import {
    useNowPlayingMovies,
    usePopularMovies,
    useTopRatedMovies,
    useUpcomingMovies
} from '../api/useTmdbApi';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const {
        data: nowPlaying,
        isLoading: isLoadingNowPlaying,
        error: errorNowPlaying
    } = useNowPlayingMovies();

    const {
        data: popular,
        isLoading: isLoadingPopular,
        error: errorPopular
    } = usePopularMovies();

    const {
        data: topRated,
        isLoading: isLoadingTopRated,
        error: errorTopRated
    } = useTopRatedMovies();

    const {
        data: upcoming,
        isLoading: isLoadingUpcoming,
        error: errorUpcoming
    } = useUpcomingMovies();

    const handleMovieClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
    };

    if (isLoadingNowPlaying || isLoadingPopular || isLoadingTopRated || isLoadingUpcoming) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
                sx={{
                    backgroundColor: '#121212'
                }}
            >
                <CircularProgress sx={{ color: '#ff4444' }} />
            </Box>
        );
    }

    if (errorNowPlaying || errorPopular || errorTopRated || errorUpcoming) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
                sx={{
                    backgroundColor: '#121212'
                }}
            >
                <Typography
                    variant={isMobile ? 'body1' : 'h6'}
                    sx={{
                        color: '#ff4444',
                        textAlign: 'center',
                        px: 2
                    }}
                >
                    Error loading movies. Please try again later.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            p: isMobile ? 1 : isTablet ? 2 : 3,
            mt: isMobile ? 6 : 8,
            backgroundColor: '#121212',
            minHeight: '100vh'
        }}>
            {nowPlaying?.results && nowPlaying.results.length > 0 && (
                <MovieSection
                    title="Now Playing"
                    movies={nowPlaying.results}
                    onMovieClick={handleMovieClick}
                />
            )}

            {popular?.results && popular.results.length > 0 && (
                <MovieSection
                    title="Popular"
                    movies={popular.results}
                    onMovieClick={handleMovieClick}
                />
            )}

            {topRated?.results && topRated.results.length > 0 && (
                <MovieSection
                    title="Top Rated"
                    movies={topRated.results}
                    onMovieClick={handleMovieClick}
                />
            )}

            {upcoming?.results && upcoming.results.length > 0 && (
                <MovieSection
                    title="Upcoming"
                    movies={upcoming.results}
                    onMovieClick={handleMovieClick}
                />
            )}
        </Box>
    );
};

export default Home;