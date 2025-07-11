import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import MovieLists from './components/MovieLists';
import MovieForm from './components/Form/MovieForm';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const retryIntervalRef = useRef(null);

  const fetchMoviesHandler = useCallback(async () => {
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
      clearInterval(retryIntervalRef.current);
    } catch (err) {
      setError('Something went wrong... Retrying');
      setIsRetrying(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  useEffect(() => {
    if (isRetrying && !retryIntervalRef.current) {
      retryIntervalRef.current = setInterval(() => {
        fetchMoviesHandler();
      }, 5000);
    }

    return () => clearInterval(retryIntervalRef.current); // clean up on unmount
  }, [isRetrying, fetchMoviesHandler]);

  const cancelRetry = () => {
    clearInterval(retryIntervalRef.current);
    retryIntervalRef.current = null;
    setIsRetrying(false);
    setError('Retry cancelled by user.');
  };

  const memoizedMovies = useMemo(() => movies, [movies]);

  return (
    <>
    <MovieForm />
      <section className="text-center my-4">
        <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded" onClick={fetchMoviesHandler}>
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

        {!isLoading && !error && memoizedMovies.length > 0 && (
          <MovieLists movies={memoizedMovies} />
        )}
      </section>
    </>
  );
};

export default App;
