import React from 'react';

const MovieLists = ({ movies = [] }) => {
  if (!Array.isArray(movies)) return <p>Invalid movie data</p>;

  return (
    <div className="container">
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        movies.map((movie) => (
          <div key={movie.id} className="border p-3 mb-3 bg-light rounded">
            <h4>{movie.title}</h4>
            <p><strong>Original Title:</strong> {movie.openingtext}</p>
            <p><strong>Release Date:</strong> {movie.releaseDate}</p>
            <a href={movie.imdbUrl} target="_blank" rel="noreferrer">View on IMDb</a>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieLists;
