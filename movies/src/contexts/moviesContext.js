import React, { useState } from "react";
import { AuthContext } from "../contexts/authContext";
import {getWatchList, getFavouriteMovies, postFavoriteMovies, deleteFavoriteMovies, postWatchList, deleteWatchList} from "../api/movies";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {

  const [favorites, setFavorites] = useState([])
  const [watchList, setWatchList] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [currentUser, setCurrentUser] =useState("");
  const context = React.useContext(AuthContext);
  const username = context.userName;

  const { data: favoriteMovies, isLoading, isError, error } = useQuery(
    ['moviesFavoriteMovieCard', {username:username}], 
    getFavouriteMovies, 
    {
      enabled: context.isAuthenticated
    });
  const { data:  watchListMovies , werror, wisLoading, wisError } = useQuery(
      ['movieWatchList', {username:username}], 
      getWatchList, 
      {
        enabled: context.isAuthenticated
      }
    
  );
  if (isLoading || wisLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  if (wisError) {
    return <h1>{werror.message}</h1>
  }
 

  const updateFavorites = async () => {
    if(favoriteMovies){

      if(currentUser !== username){
        setCurrentUser(username);
        setFavorites([]);
      }

      if(favorites.length === 0){
        setFavorites(favoriteMovies);
      }

    }
  }
  const updateWatchList = async () => {
    if(watchListMovies){
      if(currentUser !== username){
        setCurrentUser(username);
        setWatchList([]);
      }

      if(watchList.length === 0){
        setWatchList(watchListMovies);
      }

    }
  }

  const addToFavorites = async (movie) => {

    let newFavorites = []
    if (!favorites.includes(movie)){  
      
      newFavorites = [...favorites, movie];
      await postFavoriteMovies(movie, username);
      setFavorites(newFavorites);
      
    }
    else{
      newFavorites = [...favorites];
      setFavorites(newFavorites);
    }
   
  };

  const addToWatchList = async (movie) => {
    
    let newWatchList = [];
    if (!watchList.includes(movie)){
      newWatchList = [...watchList, movie];
      await postWatchList(movie, username);
      setWatchList(newWatchList)
    }
    else{
      newWatchList = [...watchList];
      setWatchList(newWatchList)
    }
   
  };



  const removeFromWatchList = (movie) => {
    deleteWatchList(movie.id, username);
     setWatchList(watchList.filter(
         (mId) => mId !== movie
      ) )
  };

  
  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    deleteFavoriteMovies(movie.id, username);
    setFavorites( favorites.filter(
      (m) => m !== movie
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        watchList,
        updateFavorites,
        updateWatchList,
        addToFavorites,
        addToWatchList,
        removeFromWatchList,
        removeFromFavorites,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;