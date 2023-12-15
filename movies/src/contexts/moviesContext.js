import React, { useState } from "react";
import {postFavoriteMovies, deleteFavoriteMovies, postWatchList, deleteWatchList} from "../api/movies";


export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [watchList, setWatchList] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 

  
  const addToFavorites = async (movie) => {
    
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
      await postFavoriteMovies(movie);
      setFavorites(newFavorites);
      
      
    }
    else{
      newFavorites = [...favorites];
      setFavorites(newFavorites);
    }
   
  };


   
  const addToWatchList = async (movie) => {
    let newWatchList = [];
    if (!watchList.includes(movie.id)){
      newWatchList = [...watchList, movie.id];
      await postWatchList(movie);
      setWatchList(newWatchList)
    }
    else{
      newWatchList = [...watchList];
      setWatchList(newWatchList)
    }
   
  };



  const removeFromWatchList = (movie) => {
    deleteWatchList(movie.id);
      setWatchList(watchList.filter(
         (mId) => mId !== movie.id
      ) )
  };

  
  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    deleteFavoriteMovies(movie.id);
     setFavorites( favorites.filter(
      (mId) => mId !== movie.id
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