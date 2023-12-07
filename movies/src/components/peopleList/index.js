import React from "react";
import People from "../peopleCard";
import Grid from "@mui/material/Grid";



const PeopleList = ( {people}) => {

  let peopleCards = people.map((m) => (
    <Grid key={m.id} item xs={11} sm={5} md={3} lg={4} xl={1}>
      <People key={m.id} people={m}/>
    </Grid>
  ));

  return(
    peopleCards
  );
};

export default PeopleList;