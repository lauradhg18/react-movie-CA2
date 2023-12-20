import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  adult: { type: Boolean },
  id: { type: Number, required: true, unique: true },
  poster_path: { type: String },
  overview: { type: String },
  release_date: { type: String },
  original_title: { type: String },
  genre_ids: [{ type: Number }],
  original_language: { type: String },
  title: { type: String },
  backdrop_path: { type: String },
  popularity: { type: Number },
  vote_count: { type: Number },
  video: { type: Boolean },
  vote_average: { type: Number },
  production_countries: [{
    iso_3166_1: { type: String },
    name: { type: String }
  }],
  runtime: { type: Number },
  spoken_languages: [{
    iso_639_1: { type: String },
    name: { type: String }
  }],
  status: { type: String },
  tagline: { type: String },
  favorite:{type: Boolean},
  usernames:[{
    username: { type: String }
  }]
});

MovieSchema.statics.addUser = function (usernameToFind, movie){

  const foundUsername = movie.usernames.some(aux => aux.username === usernameToFind);
  
      //const foundUsername = movie.usernames.find(aux => aux.username === usernameToFind);
      if (foundUsername) {
        console.log(`founded there.`); // do nothing
      } else {
        movie.usernames.push({ username: usernameToFind });
        console.log(movie.usernames)
      }
  };

MovieSchema.statics.findByMovieDBId = function (id) {
  return this.findOne({ id: id });
};

/*MovieSchema.statics.findMoviesByUsername = function (username) {
  return this.find({ username: username });
};*/

MovieSchema.statics.findMoviesByUsername = function (username) {
  return this.find({ usernames: { $elemMatch: { username: username } } });
  //this.find({ usernames: username });
};

MovieSchema.statics.findMovieByIDUsername = function (username, id) {
  return this.findOne({ id: id, username:username});
};


export default mongoose.model('watchListMovies', MovieSchema);
