import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import NavigationIcon from "@mui/icons-material/Navigation";
import LoginPage from "../../pages/loginPage";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";

function MovieListPageTemplate({ movies, title, action}) {
  
  const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const context = React.useContext(AuthContext);
  const {updateFavorites, updateWatchList} = React.useContext(MoviesContext);

  if(context.isAuthenticated){
    updateFavorites();
    updateWatchList();

  }
 let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  
  return !context.isAuthenticated ? (
    <div>
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="findmovies" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            />
            </Grid>
            <MovieList action={action} movies={displayedMovies}></MovieList>
          </Grid>
        </Grid>

        <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setLoginDrawerOpen(true)}
        sx={{
            position: "fixed",
            bottom: '1em',
            right: '1em'
        }}
      >
        
        <NavigationIcon />
        Login
      </Fab>

      <Drawer anchor="top" open={loginDrawerOpen} onClose={() => setLoginDrawerOpen(false)}>
      <LoginPage />
      </Drawer>
        
       </div>
        
  ):( 
    <div>
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="findmovies" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            />
            </Grid>
            <MovieList action={action} movies={displayedMovies}></MovieList>
          </Grid>
        </Grid>
        </div>

      );
    }
    export default MovieListPageTemplate;