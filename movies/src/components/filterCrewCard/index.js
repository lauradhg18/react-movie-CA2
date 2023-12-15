import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getDepartment } from "../../api/movies";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterCrewCard(props) {

  const { data, error, isLoading, isError } = useQuery("departmentCrew", getDepartment);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
   
  const department = data
  if (department[0].department !== "All"){
    department.unshift({ department: "All" });
  }


  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleDepartmentChange = (e) => {
    handleChange(e, "department", e.target.value);
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
          Search by name
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
        <FormControl sx={{...formControl}}>
          <InputLabel id="department-label">Department</InputLabel>
          <Select
            labelId="department-label"
            id="department-select"
            defaultValue=""
            value={props.departmentFilter}
            onChange={handleDepartmentChange}
          >
            {department.map((department) => {
              return (
                <MenuItem key={department.department} value={department.department}>
                  {department.department}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </CardContent>
      
    </Card>


  );
}