import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import React, { useContext  } from "react";
import Box from '@mui/material/Box';
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";

export default function MovieCardRecommendations({ movie, action }) {
  
  const { favorites, addToFavorites } = useContext(MoviesContext);
  const { watchList, addToWatchList } = useContext(MoviesContext);
  const context = React.useContext(AuthContext);
  if(context.isAuthenticated){
    let favoritesMovies = favorites ? favorites.map(movie => movie.id) : [];
    let watchListMovies = watchList ? watchList.map(movie => movie.id) : [];

    if (favoritesMovies.find(id => id === movie.id)) {
      
      movie.favorite = true;
    } else {
     
       movie.favorite = false;
    }
  
    if (watchListMovies.find(id => id === movie.id)) {
       movie.watchList = true;
    } else {
       movie.watchList = false;
    }
 
    const handleAddToFavorite = (e) => {
      e.preventDefault();
      addToFavorites(movie);
      
      
     
    };

    const handleAddToWatchList = (e) => {
      e.preventDefault();
      addToWatchList(movie);
    };

  } else {
    movie.favorite = false
    movie.watchList = false
  }
  
  return (
    <Card sx={{ maxWidth: 400 }}>
       <CardHeader
       title={
        <Box display="flex" alignItems="center">
          {movie.favorite && (
            <Avatar sx={{ backgroundColor: 'red', width: 30, height: 30, marginRight: 1, marginTop: 1 }}>
              <FavoriteIcon />
            </Avatar>
          )}
          {movie.watchList && (
            <Avatar sx={{ backgroundColor: 'yellow', width: 30, height: 30, marginRight: 1 }}>
              <PlaylistAddIcon />
            </Avatar>
          )}
          <Typography variant="h5" component="p">
            {movie.title}
          </Typography>
        </Box>
      }
      />
      <CardMedia
        sx={{ height: 400 }} //cambia el tamaño de la imagen
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p"  textAlign="center">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p"  textAlign="center">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {action.map(action =>  { return action(movie)})}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}