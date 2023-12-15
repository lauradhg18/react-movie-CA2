import {useState, useEffect} from "react";
import { getPeople } from "../api/movies";
import PeoplePageTemplate from '../components/templatePeopleListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const PeoplePage = (props) => {
// const storedPage = localStorage.getItem('currentPage') || 1;
const [currentPage, setCurrentPage] = useState(1);

const { data, error, isLoading, isError } = useQuery(
  ['people', currentPage], // Key for the query
  () => getPeople(currentPage), // queryFn
  {
    keepPreviousData: true, // Keep previous data while fetching new data
  }
);
const handlePageChange = (event, newPage) => {
  setCurrentPage(newPage);
};
//  useEffect(() => {
//  localStorage.setItem('currentPage', currentPage);
// }, [currentPage]);


  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const people = data.results
 
  // Redundant, but necessary to avoid app crashing.
 // const favorites = movies.filter(m => m.favorite)
 // localStorage.setItem('favorites', JSON.stringify(favorites))
 

  return (
    <div>
    <PeoplePageTemplate
    title="ACTORS"
    people={people}
    //action={(movie) => {
      //return <AddToFavoritesIcon movie={movie} />
    //}}
  />
  <Stack spacing={2}>
      <Pagination count={10} color="secondary" page={currentPage} onChange={handlePageChange}/>
       </Stack>

       </div>
  );
};
export default PeoplePage;