import { useQuery } from '@tanstack/react-query';
import { tmdbApi } from './tmdb';
import { fallbackmovieCreditsData, fallbackmovieDetailsData, fallbackNowPlayingData, fallbackPopularMoviesData, fallbacksimilarMoviesData, fallbacktopRatedData, fallbackupcomingData } from '../data/sampledata';

// Helper function to handle API errors and provide fallback data
const fetchWithFallback = async <T,>(url: string, fallbackData: T): Promise<T> => {
    try {
        const response = await tmdbApi.get<T>(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return fallbackData;
    }
};

// Now Playing Movies
export const useNowPlayingMovies = () => {
    return useQuery({
        queryKey: ['nowPlaying'],
        queryFn: async () => {

            return fetchWithFallback('/movie/now_playing', fallbackNowPlayingData);
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Popular Movies
export const usePopularMovies = () => {
    return useQuery({
        queryKey: ['popular'],
        queryFn: async () => {

            return fetchWithFallback('/movie/popular', fallbackPopularMoviesData);
        },
        staleTime: 5 * 60 * 1000,
    });
};

// Top Rated Movies
export const useTopRatedMovies = () => {
    return useQuery({
        queryKey: ['topRated'],
        queryFn: async () => {

            return fetchWithFallback('/movie/top_rated', fallbacktopRatedData);
        },
        staleTime: 24 * 60 * 60 * 1000, // 24 hours - top rated doesn't change often
    });
};

// Upcoming Movies
export const useUpcomingMovies = () => {
    return useQuery({
        queryKey: ['upcoming'],
        queryFn: async () => {

            return fetchWithFallback('/movie/upcoming', fallbackupcomingData);
        },
        staleTime: 60 * 60 * 1000, // 1 hour
    });
};

// Movie Details
export const useMovieDetails = (movieId: number) => {
    return useQuery({
        queryKey: ['movieDetails', movieId],
        queryFn: async () => {

            return fetchWithFallback(`/movie/${movieId}`, fallbackmovieDetailsData);
        },
        enabled: !!movieId, // Only run query if movieId exists
        staleTime: 60 * 60 * 1000, // 1 hour
    });
};

// Movie Credits
export const useMovieCredits = (movieId: number) => {
    return useQuery({
        queryKey: ['movieCredits', movieId],
        queryFn: async () => {


            return fetchWithFallback(`/movie/${movieId}/credits`, fallbackmovieCreditsData);
        },
        enabled: !!movieId,
    });
};

// Similar Movies
export const useSimilarMovies = (movieId: number) => {
    return useQuery({
        queryKey: ['similarMovies', movieId],
        queryFn: async () => {

            return fetchWithFallback(`/movie/${movieId}/similar`, fallbacksimilarMoviesData);
        },
        enabled: !!movieId,
    });
};