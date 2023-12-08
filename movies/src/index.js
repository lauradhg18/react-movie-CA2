import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import UpcomingPage from "./pages/upcomingPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import LatestMoviesPage from "./pages/latestMoviesPage";
import MoviePage from "./pages/movieDetailsPage";
import PeopleDetailsPage from "./pages/peopleDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import WatchListMoviesPage from "./pages/watchListMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import PeoplePage from "./pages/peoplePage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'

//Add protectedRoutes import ProtectedRoutes from "./protectedRoutes";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
        <Routes>
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/movies/watchList" element={<WatchListMoviesPage />} />
          {<Route path="/movies/upcoming" element={<UpcomingPage />} /> }
          {<Route path="/movies/topRated" element={ <TopRatedMoviesPage /> } />}
          {<Route path="/movies/latest" element={ <LatestMoviesPage /> } />}
          {<Route path="/movies/popular" element={ <PopularMoviesPage /> } />}
          <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/movies/people/:id" element={<PeopleDetailsPage />} />
          <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
          <Route path="/movies/people" element={<PeoplePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);

