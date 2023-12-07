import {useEffect, useState}  from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function MovieRate({movie}) {
  
  const storedValue = localStorage.getItem('movieRating' + movie.id);
  const [value, setValue] = useState(storedValue ? parseFloat(storedValue) : 2);
  
  useEffect(() => {
    localStorage.setItem('movieRating' + movie.id, value.toString());
  });

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Rate the Movie!</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      
    </Box>
  );
}
