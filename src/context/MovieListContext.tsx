import React, { createContext, useContext, useReducer, useEffect } from 'react';

type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    adult?: boolean;
    backdrop_path?: string | null;
    genre_ids?: number[];
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    release_date?: string;
    video?: boolean;
    vote_count?: number;
};

type State = {
    myList: Movie[];
};

type Action =
    | { type: 'ADD_TO_LIST'; payload: Movie }
    | { type: 'REMOVE_FROM_LIST'; payload: number }
    | { type: 'SET_LIST'; payload: Movie[] };

const initialState: State = {
    myList: [],
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_TO_LIST':
            if (state.myList.some(movie => movie.id === action.payload.id)) {
                return state;
            }
            return { ...state, myList: [...state.myList, action.payload] };
        case 'REMOVE_FROM_LIST':
            return { ...state, myList: state.myList.filter(movie => movie.id !== action.payload) };
        case 'SET_LIST':
            return { ...state, myList: action.payload };
        default:
            return state;
    }
};

const MovieListContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const MovieListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initializer = (): State => {
        const savedList = localStorage.getItem('myMovieList');
        return savedList ? { myList: JSON.parse(savedList) } : initialState;
    };

    const [state, dispatch] = useReducer(reducer, initialState, initializer);


    useEffect(() => {
        localStorage.setItem('myMovieList', JSON.stringify(state.myList));
    }, [state.myList]);

    return (
        <MovieListContext.Provider value={{ state, dispatch }}>
            {children}
        </MovieListContext.Provider>
    );
};

export const useMovieList = () => useContext(MovieListContext);