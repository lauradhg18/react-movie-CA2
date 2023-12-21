# react-movie-CA2
React movie assigment 2

# Assignment 2 - Web API.

Name: Laura De Haro García

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Api extended with all endpoints previously done by the front end to tmdb 
 + Fully integrated (all fetches from frontend app go to the web API)
 + User-specific data (favorite movies and watchlist) is displayed
 + Login and sign up implemented plus protected routes
 + Validaton errors are displayed in longin page
 + Profile page with logout button 

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

______________________
NODEENV=development
PORT=8080
HOST=
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies | GET | Gets a list of movies 
- /api/movies/tmdb/detailsMovie/:id | GET | 
- /api/moviesv/tmdb/peopleDetails/:id | GET | 
- /api/movies/tmdb/movieImg/:id | GET | 
- /api/movies/tmdb/provider/:id | GET | 
- /api/movies/tmdb/actorImg:id | GET | 
- /api/movies/tmdb/recommendations/:id | GET | 
- /api/movies/tmdb/reviews/:id | GET | 
- /api/movies/tmdb/movieCredits/:id | GET | 
- /api/movies/tmdb/peopleMovieCredits/:id | GET | 
- /api/movies/tmdb/discoverMovies/:id | GET | 
- /api/movies/tmdb/genres | GET | 
- /api/movies/tmdb/upcoming/:page | GET | 
- /api/movies/tmdb/topRated/:page | GET | 
- /api/movies/tmdb/latestMovies/:page | GET | 
- /api/movies/tmdb/popularMovies/:page | GET | 
- /api/movies/tmdb/people/:page | GET | 
- /api/movies/tmdb/department | GET | 
- /api/movies/favs | POST | 
- /api/movies/favs/:id/:username | DELETE |
- /api/movies/favs/:username | GET | 
- /api/movies/watchList | POST | 
- /api/movies/watchList/:id/:username | DELETE |
- /api/movies/watchList/:username | GET | 
- /api/users/ | GET |
- /api/users/ | POST |
- /api/users/ | PUT |

## Security and Authentication
Routes protected:
- /movies/favorites
- /movies/watchList
- /movies/profile

## Integrating with React App

I have enabled all the fetches to the tmdb api to be done through the web api

