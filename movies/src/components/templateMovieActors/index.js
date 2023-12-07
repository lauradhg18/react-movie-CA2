import React, { useState }  from "react";
import Grid from "@mui/material/Grid";
import MovieActorList from "../actorList";
import FilterCard from "../filterPeopleCard";

function MovieActorsTemplate({cast}) { 
   const [nameFilter, setNameFilter] = useState("");

   
   let displayedCast= cast
     .filter((c) => {
       return c.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
     })
     
 
   const handleChange = (type, value) => {
     if (type === "name") setNameFilter(value);
     
   };
     
      return (
         <Grid container sx={{ padding: '60px' }}>
          <Grid item container spacing={2}>  
          <Grid key="findCast" item xs={12} sm={6} md={4} lg={30} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            
            />
            </Grid>
              
             <MovieActorList cast={displayedCast} ></MovieActorList>
              </Grid>
           </Grid>
      );
   
};

export default MovieActorsTemplate;