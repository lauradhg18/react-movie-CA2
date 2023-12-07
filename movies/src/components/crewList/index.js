import React from "react";
import Crew from "../movieCrewCard";
import Grid from "@mui/material/Grid";

const MovieCrewList = ({crew}) => {
 
  let crewCards = crew.map((c) => (

    <Grid key={c.credit_id} item xs={2} sm={2} md={2} lg={4} xl={1}>
      <Crew key={c.credit_id} crew={c} />
    </Grid>
  ));

  return(
    crewCards.slice(0,6)
  );
};

export default MovieCrewList;