import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'



const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterPeopleCard(props) {


  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };



  return (

    <Card 
      sx={{
        maxWidth: 345,
        backgroundColor: "rgb(204, 153, 255)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Search by Name.
        </Typography>
        <TextField
          sx={{...formControl}}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        
      </CardContent>
      <CardMedia
        sx={{ height: 200 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <StarPurple500Icon  fontSize="large" />
          DISCOVER ACTORS!
          <br />
        </Typography>
      </CardContent>
    </Card>


  );
}