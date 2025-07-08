import React from 'react';

const Movie = (props) => {
  return (
    <li>
      <h2>{props.title}</h2>
      <h3>{props.openingtext}</h3>
      <p>{props.releaseDate}</p>
    </li>
  );
};

export default Movie;
