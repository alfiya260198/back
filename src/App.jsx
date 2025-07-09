import React, { useState } from 'react';
import MovieLists from './components/MovieLists';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    const url =
      'https://imdb236.p.rapidapi.com/api/imdb/search?type=movie&genre=Drama&rows=10&sortOrder=ASC&sortField=id';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '6a6b5e92f5msh6dedcff34dc2c7cp16fdefjsn21e9c5b067fa',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com',
      },
    };

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(url, options);
      const result = await response.json();

      console.log('API result:', result); // 👈 Check this in browser console

      const moviesArray = Array.isArray(result.data) ? result.data : [];

      const transformed = moviesArray.map((movie, index) => ({
        id: movie.id || index,
        title: movie.primaryTitle || 'No Title',
        openingtext: movie.originalTitle || 'No Description',
        releaseDate: 'Unknown', // We don't get release date from this API
        imdbUrl: movie.url || '#',
      }));

      setMovies(transformed);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <>
    <section className="text-center my-4">
      <button className="btn btn-primary" onClick={fetchMoviesHandler}>
        Fetch IMDB Movies
      </button>
    </section>

    <section className="container">
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && <p className="text-danger">{error}</p>}

      {!isLoading && !error && movies.length > 0 && <MovieLists movies={movies} />}
    </section>
  </>
);
};

export default App;
