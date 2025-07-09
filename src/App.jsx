import React, { useState, useRef } from 'react';
import MovieLists from './components/MovieLists';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const retryIntervalRef = useRef(null); // to store interval ID

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.py4e.com/api/films/');
      if (!response.ok) throw new Error('API Failed');
      const data = await response.json();

      const transformed = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingtext: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      setMovies(transformed);
      setIsRetrying(false);
      clearInterval(retryIntervalRef.current); // clear if retry was ongoing
    } catch (err) {
      console.log('Retrying...');
      setError('Something went wrong... Retrying');
      setIsRetrying(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Retry mechanism (5 seconds)
  const handleRetry = () => {
    if (!retryIntervalRef.current) {
      retryIntervalRef.current = setInterval(() => {
        fetchMoviesHandler();
      }, 5000);
    }
  };

  const cancelRetry = () => {
    clearInterval(retryIntervalRef.current);
    retryIntervalRef.current = null;
    setIsRetrying(false);
    setError('Retry cancelled by user.');
  };

  // Start retry loop when error starts
  if (isRetrying && !retryIntervalRef.current) {
    handleRetry();
  }

  return (
    <>
      <section className="text-center my-4">
        <button className="bg-blue-950 text-white px-7 py-2 border rounded-4xl" onClick={fetchMoviesHandler}>
          Fetch Movies
        </button>
      </section>

      <section className="container">
        {isLoading && <p>Loading...</p>}

        {error && (
          <>
            <p className="text-danger">{error}</p>
            {isRetrying && (
              <button className="btn btn-danger mb-3" onClick={cancelRetry}>
                Cancel Retry
              </button>
            )}
          </>
        )}

        {!isLoading && !error && movies.length > 0 && <MovieLists movies={movies} />}
      </section>
    </>
  );
};

export default App;
