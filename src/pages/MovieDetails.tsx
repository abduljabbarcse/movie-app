import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box, Typography, Button, CircularProgress, Grid, Avatar, Divider,
    useMediaQuery, useTheme, Chip, Stack
} from '@mui/material';
import { useMovieDetails, useMovieCredits, useSimilarMovies } from '../api/useTmdbApi';
import MovieCard from '../components/MovieCard';
import { useMovieList } from '../context/MovieListContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const movieId = parseInt(id || '0');
    const navigate = useNavigate();
    const { state, dispatch } = useMovieList();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const { data: movie, isLoading, error } = useMovieDetails(movieId);
    const { data: credits } = useMovieCredits(movieId);
    const { data: similarMovies } = useSimilarMovies(movieId);

    const isInList = state.myList.some(m => m.id === movieId);

    const handleAddToList = () => {
        if (movie) {
            if (isInList) {
                dispatch({ type: 'REMOVE_FROM_LIST', payload: movieId });
            } else {
                dispatch({
                    type: 'ADD_TO_LIST',
                    payload: {
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        vote_average: movie.vote_average,
                    },
                });
            }
        }
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" sx={{ backgroundColor: '#121212' }}>
                <CircularProgress sx={{ color: '#ff4444' }} />
            </Box>
        );
    }

    if (error || !movie) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" sx={{ backgroundColor: '#121212' }}>
                <Typography variant={isMobile ? 'body1' : 'h6'} sx={{ color: '#ff4444', px: 2, textAlign: 'center' }}>
                    Error loading movie details. Please try again later.
                </Typography>
            </Box>
        );
    }

    const director = credits?.crew?.find(person => person.job === 'Director');
    const genres = movie.genres?.map(genre => genre.name).join(', ');

    return (
        <Box sx={{
            p: isMobile ? 1 : isTablet ? 2 : 3,
            mt: isMobile ? 6 : 8,
            backgroundColor: '#121212',
            color: 'white',
            minHeight: '100vh'
        }}>
            <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                sx={{
                    mb: 2,
                    color: '#ff4444',
                    borderColor: '#ff4444',
                    '&:hover': {
                        borderColor: '#ff6666',
                        backgroundColor: 'rgba(255, 0, 0, 0.1)'
                    }
                }}
                startIcon={<ArrowBackIcon />}
            >
                Back
            </Button>

            <Grid container spacing={isMobile ? 2 : 4}>
                <Grid >
                    <Box
                        component="img"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        sx={{
                            width: '100%',
                            borderRadius: 2,
                            boxShadow: '0 4px 20px rgba(255, 0, 0, 0.3)'
                        }}
                    />
                </Grid>
                <Grid >
                    <Typography variant={isMobile ? 'h4' : 'h3'} gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                        {movie.title}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', rowGap: 1 }}>
                        <Chip
                            label={`⭐ ${movie.vote_average.toFixed(1)}`}
                            sx={{ backgroundColor: '#ff4444', color: 'white' }}
                        />
                        <Chip
                            label={movie.release_date?.split('-')[0]}
                            sx={{ backgroundColor: '#333', color: 'white' }}
                        />
                        <Chip
                            label={`${movie.runtime} mins`}
                            sx={{ backgroundColor: '#333', color: 'white' }}
                        />
                        {movie.genres?.length > 0 && (
                            <Chip
                                label={genres}
                                sx={{ backgroundColor: '#333', color: 'white' }}
                            />
                        )}
                    </Stack>

                    <Button
                        variant="contained"
                        color={isInList ? 'error' : 'primary'}
                        startIcon={isInList ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        onClick={handleAddToList}
                        sx={{
                            mb: 3,
                            backgroundColor: isInList ? '#ff4444' : '#333',
                            '&:hover': {
                                backgroundColor: isInList ? '#ff6666' : '#444'
                            }
                        }}
                    >
                        {isInList ? 'In Your List' : 'Add to My List'}
                    </Button>

                    <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom sx={{ color: '#ff4444', mt: 2 }}>
                        Overview
                    </Typography>
                    <Typography paragraph sx={{ color: '#ddd', lineHeight: 1.6 }}>
                        {movie.overview}
                    </Typography>

                    {director && (
                        <>
                            <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom sx={{ color: '#ff4444', mt: 2 }}>
                                Director
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Avatar
                                    src={director.profile_path ? `https://image.tmdb.org/t/p/w200${director.profile_path}` : undefined}
                                    alt={director.name}
                                    sx={{ width: 56, height: 56 }}
                                />
                                <Typography sx={{ color: 'white' }}>{director.name}</Typography>
                            </Box>
                        </>
                    )}

                    {credits?.cast && credits.cast.length > 0 && (
                        <>
                            <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom sx={{ color: '#ff4444', mt: 2 }}>
                                Main Cast
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: isMobile ? 1 : 2,
                                overflowX: 'auto',
                                py: 1
                            }}>
                                {credits.cast.slice(0, isMobile ? 4 : 6).map(actor => (
                                    <Box
                                        key={actor.id}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            minWidth: isMobile ? 120 : 150,
                                            mb: 1
                                        }}
                                    >
                                        <Avatar
                                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : undefined}
                                            alt={actor.name}
                                            sx={{ width: 40, height: 40 }}
                                        />
                                        <Typography sx={{ color: 'white', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                                            {actor.name}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </>
                    )}
                </Grid>
            </Grid>

            {similarMovies?.results && similarMovies.results.length > 0 && (
                <>
                    <Divider sx={{
                        my: 4,
                        borderColor: 'rgba(255, 68, 68, 0.3)',
                        borderBottomWidth: 2
                    }} />
                    <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom sx={{ color: '#ff4444' }}>
                        Similar Movies
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: isMobile ? 1 : 2,
                        py: 2,
                        '&::-webkit-scrollbar': {
                            height: '6px'
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'rgba(0, 0, 0, 0.1)'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#ff4444',
                            borderRadius: '3px'
                        }
                    }}>
                        {similarMovies.results.map(movie => (
                            <Box key={movie.id} sx={{ minWidth: isMobile ? 150 : 180 }}>
                                <MovieCard
                                    movie={movie}
                                    onClick={() => navigate(`/movie/${movie.id}`)}
                                    showAddToList={false}
                                />
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default MovieDetails;