import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const {favorites} = useContext(MoviesContext);

  let movies = favorites; 

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


