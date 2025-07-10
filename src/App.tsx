import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import MyList from './pages/MyList';
import MovieDetails from './pages/MovieDetails';
import { MovieListProvider } from './context/MovieListContext';

const App: React.FC = () => {
  return (
    <Router>
      <MovieListProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Header />
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/my-list" element={<MyList />} />
            </Routes>
          </Box>
        </Box>
      </MovieListProvider>
    </Router>
  );
};

export default App;