import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterPeopleCard";
import PeopleList from "../peopleList";
import Grid from "@mui/material/Grid";

function PeopleListPageTemplate({ people, title }) {
  const [nameFilter, setNameFilter] = useState("");

  let displayedPeople = people
    .filter((p) => {
      return p.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    
  };

  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="findActors" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            
            />
            </Grid>
            <PeopleList  people={displayedPeople}></PeopleList>
          </Grid>
        </Grid>
      );
    }
    export default PeopleListPageTemplate;