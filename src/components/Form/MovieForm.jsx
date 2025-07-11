import React, { useState, useCallback } from 'react';

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [openingText, setOpeningText] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const newMovieObj = {
      title: title.trim(),
      openingText: openingText.trim(),
      releaseDate,
    };

    console.log('NewMovieObj:', newMovieObj);

    // Clear inputs after submission
    setTitle('');
    setOpeningText('');
    setReleaseDate('');
  }, [title, openingText, releaseDate]);

  return (
    <div className='m-10'>
      <form className='bg-white w-[60%] mx-auto p-8 rounded-md' onSubmit={handleSubmit}>
        <div className='flex flex-col mb-4'>
          <label>Title</label>
          <input
            type="text"
            className='border border-gray-700 rounded p-1'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className='flex flex-col mb-4'>
          <label>Opening text</label>
          <textarea
            rows={5}
            cols={50}
            className='border border-gray-700 rounded p-1'
            value={openingText}
            onChange={(e) => setOpeningText(e.target.value)}
            required
          ></textarea>
        </div>

        <div className='flex flex-col mb-4'>
          <label>Release Date</label>
          <input
            type="date"
            className='border border-gray-700 rounded p-1'
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>

        <div className='w-[15%] mx-auto'>
          <button
            type="submit"
            className='bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-2'
          >
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
