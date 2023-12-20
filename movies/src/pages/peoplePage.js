import {useState} from "react";
import { getPeople } from "../api/movies";
import PeoplePageTemplate from '../components/templatePeopleListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const PeoplePage = (props) => {
const [currentPage, setCurrentPage] = useState(1);

const { data, error, isLoading, isError } = useQuery(
  ['people', currentPage], 
  () => getPeople(currentPage), 
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
  const people = data.results
 


  return (
    <div>
    <PeoplePageTemplate
    title="ACTORS"
    people={people}
    
  />
  <Stack spacing={2}>
      <Pagination count={10} color="secondary" page={currentPage} onChange={handlePageChange}/>
       </Stack>

       </div>
  );
};
export default PeoplePage;