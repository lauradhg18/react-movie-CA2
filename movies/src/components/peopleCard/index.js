import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import React from "react";


export default function PeopleCard({people}) {

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        sx={{height: 400}}
        image={
            people.profile_path
            ? `https://image.tmdb.org/t/p/w500${people.profile_path}`
            : img
        }
      />
      <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
        <Typography variant="h6" component="p">
            {people.name}
         </Typography>
          <Typography variant="h7" component="p">
            {people.known_for_department}
         </Typography>
      </Grid>
      </Grid>
      </CardContent>
         <CardActions disableSpacing>
           <Link to={`/movies/people/${people.id}`}>
           <Button variant="outlined" size="medium" color="primary">
              More Info ...
           </Button>
          </Link>
         </CardActions>
    </Card>
  );
}