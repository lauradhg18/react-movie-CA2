import React from "react";
import MovieRec from "../movieCardRecommendations";
import Grid from "@mui/material/Grid";


const MovieListRecommendation = ({movies, action, currentPage }) => {
 
  let movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={2} sm={2} md={2} lg={4} xl={1}>
      <MovieRec key={m.id} movie={m} action={action} />
    </Grid>
  ));

  return(
    movieCards.slice(currentPage,currentPage+3)
  );
};

export default MovieListRecommendation;