import React from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";


const MovieList = ( {movies, action}) => {
  
  let movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={11} sm={5} md={3} lg={4} xl={1}>
      <Movie key={m.id} movie={m} action={action} />
    </Grid>
  ));

  return(
    movieCards
  );
};

export default MovieList;