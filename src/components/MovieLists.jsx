import React from 'react';
import Movie from './Movie';

const MovieLists = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          openingtext={movie.openingtext}
          releaseDate={movie.releaseDate}
        />
      ))}
    </ul>
  );
};

export default MovieLists;
