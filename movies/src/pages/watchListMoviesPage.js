import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getWatchList } from "../api/movies";
import Spinner from '../components/spinner'
import RemoveFromWatchList from "../components/cardIcons/removeFromWatchList";


const WatchListMoviesPage = () => {
  const {watchList: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.


  const watchListMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movieWatchList", { id: movieId }],
        queryFn: getWatchList,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = watchListMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  let movies = watchListMovieQueries;  
  if (watchListMovieQueries.length !== 0) {
    movies = watchListMovieQueries.map((q) => {
      return q.data
    });
  }

  const toDo = () => true;

  return (
    <PageTemplate
    title="WatchList"
    movies={movies}
    action={[
      (movie) => <RemoveFromWatchList movie={movie} />
      
    ]}
  />
  );
};

export default WatchListMoviesPage;