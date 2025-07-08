import React, { useState } from 'react';
import MovieLists from './components/MovieLists';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    const url = 'https://imdb236.p.rapidapi.com/api/imdb/tt0816692/tmdb-id';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '6f26f99f92msh63560547fbd9e48p1334f4jsn455686a52795',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
      }
    };

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Something went wrong while fetching movie');
      }

      const result = await response.json();
      console.log(result);

      const movieData = result.data;

      const transformedMovie = {
        id: movieData?.id || '1',
        title: movieData?.titleText?.text || 'No Title',
        openingtext: movieData?.plot?.plotText?.plainText || 'No Description',
        releaseDate: movieData?.releaseDate
          ? `${movieData.releaseDate.year}-${movieData.releaseDate.month || '01'}-${movieData.releaseDate.day || '01'}`
          : 'Unknown'
      };

      setMovies([transformedMovie]); // MovieLists expects an array
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch IMDB Movie</button>
      </section>

      <section>
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!isLoading && !error && <MovieLists movies={movies} />}
      </section>
    </React.Fragment>
  );
};

export default App;
