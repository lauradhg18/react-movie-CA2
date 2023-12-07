import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { getPeopleMovieCredits} from "../../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../spinner';
import AddToFavoritesIcon from '../cardIcons/addToFavorites'
import CakeIcon from '@mui/icons-material/Cake';
import Grid from "@mui/material/Grid";
import MovieListRecommendation from "../movieListRecommendations";
import AddToWatchListIcon from '../cardIcons/addToWatchListIcon'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};

const PeopleDetails = ({actor}) => {  
  const [movieCreditsPage, setMovieCreditsPage] = useState(1);
  const {data: moviecredits, error: movError, isLoading: movLoading, isError:movIsErr }  = useQuery(
    'moviecredits' + actor.id, ()=> getPeopleMovieCredits(actor.id))
  
  if (movLoading) {
    return <Spinner />;
  }
  
  if (movIsErr) {
    return <h1>{movError.message}</h1>
  }  
   
  const movieCredits = moviecredits.cast
  
  const handleMovieCreditsPageChange = (event, newMovieCreditsPage) => {
    setMovieCreditsPage(newMovieCreditsPage);
  
  };
  
  const favorites = movieCredits.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const watchListStored = movieCredits.filter(m => m.watchList)
  localStorage.setItem('forWatchList', JSON.stringify(watchListStored))

  let deathDate
  if (actor.deathday != null){
      deathDate =  movieCredits.deathday
  }else {
      deathDate = "-"
  }

let gender;

switch (actor.gender) {
  case 1:
    gender = "Female";
    break;
  case 2:
    gender = "Male";
    break;
  case 3:
    gender = "Non binary";
    break;
  default:
    gender = "Not specified";
}

  return (
    <>

      <Typography variant="h5" component="h3">
        BIOGRAPHY
      </Typography>
      <Typography variant="h6" component="p">
        {actor.biography}
      </Typography>


      <Paper component="ul" sx={{...root}}>
        <Chip icon={<CakeIcon/>} label={`Birth Date: ${actor.birthday}`} />
        <Chip
          label={`Death Date: ${deathDate}`}
        />
        <Chip
          icon={<StarRate />}
          label={`Popularity: ${actor.popularity}`}
        />
         <Chip
          icon={<StarRate />}
          label={`Gender: ${gender}`}
        />
      </Paper>
      
      
      <Typography variant="h5" component="h3" textAlign="center" >
        MOVIES CREDITS
      </Typography>
      <div>
      <Grid container sx={{ padding: '60px' }}>
          <Grid  item container spacing={2}>    
  <  MovieListRecommendation action={[
          (movie) => <AddToFavoritesIcon movie={movie} />,
          (movie) => <AddToWatchListIcon movie={movie} />,
        ]}  movies={movieCredits} currentPage={movieCreditsPage}></MovieListRecommendation>
           </Grid>
      </Grid>
      <Stack spacing={2}>
      <Pagination count={15} color="secondary" page={movieCreditsPage} onChange={handleMovieCreditsPageChange}/>
       </Stack>
       </div>
      
      
      </>
  );
};
export default PeopleDetails ;