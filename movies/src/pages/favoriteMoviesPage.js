import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getFavouriteMovies } from "../api/movies";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movieFavorites", { id: movieId }],
        queryFn: getFavouriteMovies,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  let movies = favoriteMovieQueries;  
  if (favoriteMovieQueries.length !== 0) {
    movies = favoriteMovieQueries.map((q) => {
      return q.data
    });
  }
  

  const toDo = () => true;

  return (
    <PageTemplate
    title="Favorite Movies"
    movies={movies}
    action={[
      (movie) => <RemoveFromFavorites movie={movie} />,
      (movie) => <WriteReview movie={movie} />,
    ]}
  />
  );
};

export default FavoriteMoviesPage;


