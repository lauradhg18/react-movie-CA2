import React from "react";
import Actor from "../movieActorsCard";
import Grid from "@mui/material/Grid";



const MovieActorList = ({cast}) => {
 
  let actorCards = cast.map((c) => (
    <Grid key={c.id} item xs={2} sm={2} md={2} lg={4} xl={1}>
      <Actor key={c.id} cast={c} />
    </Grid>
  ));

  return(
    actorCards.slice(0,6)
  );
};

export default MovieActorList;