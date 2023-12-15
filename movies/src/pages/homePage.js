import {useState} from "react";
import { getMovies } from "../api/movies"
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchListIcon from '../components/cardIcons/addToWatchListIcon'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const HomePage = (props) => {
 
  const [currentPage, setCurrentPage] = useState(1);
 

  const { data, error, isLoading, isError } = useQuery(
    ['movies'+currentPage, currentPage],
    () => getMovies(currentPage),          
    {
      keepPreviousData: true, 
    }
  );
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  


  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;



  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const watchList = movies.filter(m => m.watchList)
  localStorage.setItem('watchList', JSON.stringify(watchList))
  

  return (
<div>
    <PageTemplate
 
    title="Discover Movies"
    movies={movies}
    action={[
      (movie) => <AddToFavoritesIcon movie={movie} />,
      (movie) => <AddToWatchListIcon movie={movie} />,
    ]}
  />

  <Stack spacing={2}>
      <Pagination count={10} color="secondary" page={currentPage} onChange={handlePageChange}/>
       </Stack>

       </div>

  
  );
};
export default HomePage;

