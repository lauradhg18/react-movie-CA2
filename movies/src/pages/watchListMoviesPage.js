import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import RemoveFromWatchList from "../components/cardIcons/removeFromWatchList";


const WatchListMoviesPage = () => {
  const {watchList} = useContext(MoviesContext);

  let movies = watchList;


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