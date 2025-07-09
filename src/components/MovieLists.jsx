import React from 'react';

const MovieLists = ({ movies = [] }) => {
  if (!Array.isArray(movies)) return <p>Invalid movie data</p>;

  return (
    <div className="w-[50%] mx-auto">
      {movies.map((movie) => (
        <div key={movie.id} className="border p-3 mb-3 bg-light rounded bg-amber-200">
          <h4 className='font-bold text-xl'>{movie.title}</h4>
          <p><strong>Opening Text:</strong> {movie.openingtext}</p>
          <p><strong>Release Date:</strong> {movie.releaseDate}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieLists;
