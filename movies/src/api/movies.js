export const getMovies = async (page) => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/discoverMovies/'+ page, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };

  

  export const getMovie = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const  { id } = idPart;
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/detailsMovie/'+ id, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    */
      method: 'get'
    }
    )
    return response.json();
  };


  export const getMovieRecommendations = async (id) => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/recommendations/' + id, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };

  export const getMovieReviews = async (id) => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/reviews/' + id, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'

    }
    )
    return response.json();
  };

  export const getMovieCredits = async (id) => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/movieCredits/' + id, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };

  export const getPeopleMovieCredits = async (id) => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/peopleMovieCredits/' + id, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };


  export const getMovieImages = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const  { id } = idPart;
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/movieImg/' + id, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };


  export const getMovieProviders = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/provider/' + id, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };

  export const getActorImages = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/actorImg/' + id, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };

  export const getPeopleDetails = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/peopleDetails/' + id, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };


  export const getGenres = async () => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/genres', {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };


  export const getUpcomingMovies = async (page) => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/upcoming/' + page, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };


  export const getTopRated = async (page) => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/topRated/'+ page, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };

  export const getLatestMovies = async (page) => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/latestMovies/'+ page, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };


  export const getPopularMovies = async (page) => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/popularMovies/'+ page, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/ 
      method: 'get'
    }
    )
    return response.json();
  };

  export const getPeople = async (page) => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/people/'+ page, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };

  export const getDepartment = async () => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/department', {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }*/
      method: 'get'
    }
    )
    return response.json();
  };


  export const getFavouriteMovies = async ({ queryKey }) => {
    const [, data] = queryKey;
    const  { username } = data;
    const response = await fetch(
      'http://localhost:8080/api/movies/favs/'+ username, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    */
      method: 'get'
    }
    )
    return response.json();
  };

  export const getWatchList = async ({ queryKey }) => {
    const [, data] = queryKey;
    const  { username } = data;
    const response = await fetch(
      'http://localhost:8080/api/movies/watchList/'+ username, {
      /*headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    */
      method: 'get'
    }
    )
    return response.json();
  };

  export const postFavoriteMovies = async (movie, username) => {
 
    const response = await fetch('http://localhost:8080/api/movies/favs', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({movie: movie, username: username})
    });
    return response.json();
  };

  export const postWatchList = async (movie, username) => {
 
    const response = await fetch('http://localhost:8080/api/movies/watchList', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({movie: movie, username: username})
    });
    return response.json();
  };


  export const deleteFavoriteMovies = async (id, username) => {
 
    const response = await fetch('http://localhost:8080/api/movies/favs/'+ id+'/' + username, {
        
        method: 'delete'
        
    });
    return response;
  };

  export const deleteWatchList = async (id, username) => {
 
    const response = await fetch('http://localhost:8080/api/movies/watchList/'+ id+'/' + username, {
        
        method: 'delete'
        
    });
    return response;
  };

  export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};