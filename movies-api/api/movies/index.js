import movieModel from './movieModel';
import favoriteModel from './favoriteMoviesModel';
import watchListModel from './watchListModel'
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies, getGenres, getMovies, getTopRated, getLatestMovies, getPopularMovies, getMovieDetails,
    getPeople, getDepartment, getPeopleDetails, getMovieRecommendations, getMovieReviews, getMovieCredits, getPeopleMovieCredits, getMovieImages, getMovieProviders, getActorImages
  } from '../tmdb-api';


const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 30 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/detailsMovie/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovieDetails(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));



router.get('/tmdb/peopleDetails/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const person = await getPeopleDetails(id);
    if (person) {
        res.status(200).json(person);
    } else {
        res.status(404).json({message: 'The person you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/movieImg/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovieImages(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/provider/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovieProviders(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/actorImg/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const person = await getActorImages(id);
    if (person) {
        res.status(200).json(person);
    } else {
        res.status(404).json({message: 'The person you requested could not be found.', status_code: 404});
    }
}));


router.get('/tmdb/recommendations/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movies = await getMovieRecommendations(id);
    res.status(200).json(movies);
}));

router.get('/tmdb/reviews/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movies = await getMovieReviews(id);
    res.status(200).json(movies);
}));

router.get('/tmdb/movieCredits/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movies = await getMovieCredits(id);
    res.status(200).json(movies);
}));

router.get('/tmdb/peopleMovieCredits/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movies = await getPeopleMovieCredits(id);
    res.status(200).json(movies);
}));

router.get('/tmdb/discoverMovies/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const movies = await getMovies(page);
    res.status(200).json(movies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/tmdb/upcoming/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const upcomingMovies = await getUpcomingMovies(page);
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/topRated/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const topRatedMovies = await getTopRated(page);
    res.status(200).json(topRatedMovies);

}));

router.get('/tmdb/latestMovies/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const LatesMovies = await getLatestMovies(page);
    res.status(200).json(LatesMovies);

}))

;router.get('/tmdb/popularMovies/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const popMovies = await getPopularMovies(page);
    res.status(200).json(popMovies);

}));

router.get('/tmdb/people/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const people = await getPeople(page);
    res.status(200).json(people);

}));

router.get('/tmdb/department', asyncHandler(async (req, res) => {
    const dept = await getDepartment();
    res.status(200).json(dept);

}));

//POST

// add movie to favorites
router.post('/favs', asyncHandler(async (req, res) => {
    try {
        
        const movies = await favoriteModel.create(req.body);
        res.status(201).json({ success: true, msg: 'success.' });
        
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

//delete from favorite list

router.delete('/favs/:id', asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;
    const id = parseInt(req.params.id);
    const result = await favoriteModel.deleteOne({
        id: id,
    });
    if (result.deletedCount) {
        res.status(204).json();
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find movie' });
    }
}));


//retrieve favourites movies
router.get('/favs/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await favoriteModel.findByMovieDBId(id);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'No favourite movies', status_code: 404});
    }
}));

//watchList

router.post('/watchList', asyncHandler(async (req, res) => {
    try {
        
        const movies = await watchListModel.create(req.body);
        res.status(201).json({ success: true, msg: 'success.' });
        
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

router.delete('/watchList/:id', asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;
    const id = parseInt(req.params.id);
    const result = await watchListModel.deleteOne({
        id: id,
    });
    if (result.deletedCount) {
        res.status(204).json();
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find movie' });
    }
}));


router.get('/watchList/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await watchListModel.findByMovieDBId(id);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'No favourite movies', status_code: 404});
    }
}));

export default router;