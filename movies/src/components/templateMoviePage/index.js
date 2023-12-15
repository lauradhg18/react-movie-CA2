import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/movies";
import { getMovieProviders } from "../../api/movies";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const TemplateMoviePage = ({ movie, children }) => {
  const { data: img , error: imgerr, isLoading: imgLoad, isError: imgErr } = useQuery(
    ["images" + movie.id, { id: movie.id }],
    getMovieImages
  );
   const { data: provider , error: proverr, isLoading: provLoad, isError: provErr } = useQuery(
    ["providers" + movie.id, { id: movie.id }],
    getMovieProviders
  );

  if (imgLoad || provLoad) {
    return <Spinner />;
  }

  if (imgErr) {
    return <h1>{imgerr.message}</h1>;
  }
  if (provErr) {
    return <h1>{proverr.message}</h1>;
  }
  const images = (img.posters).slice(0, 2);
  
  let providers = null
  if(provider.results.IE !== undefined){
    console.log(provider.results.IE)
    providers = Object.values(provider.results.IE)
  }
  
 

  return (
    <div>
      <MovieHeader movie={movie} />
      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList 
                cols={1}>
                {images.map((image) => (
                    <ImageListItem key={image.file_path} cols={1}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                        alt={image.poster_path}
                    />
                    </ImageListItem>
                ))
                }
            </ImageList>
          </div>
          <Card 
      sx={{
        maxWidth: 345,
        backgroundColor: "rgb(204, 153, 255)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          WHERE TO WATCH
        </Typography>
        <Grid container sx={{ padding: '60px' }}>
       
        {providers!==null ? ( 
        providers[1].map((aux) => (
            <div key={aux.provider_name+aux.logo_path}>
           <li key={aux.provider_name}>
           {aux.provider_name}
         </li>
         <ImageListItem key={aux.logo_path}>
         <img
         src={`https://image.tmdb.org/t/p/w500/${aux.logo_path}`}
         alt={aux.provider_id}
         style={{ width: '50px' }}
         />  
         </ImageListItem>
         </div>
          ))
          ):( 
          <Typography variant="h6" component="h1">
            No providers in Ireland
          </Typography>
          )}
           </Grid>
           </CardContent>
      
      </Card>
      
           </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default TemplateMoviePage;

