import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Api() {
  const [posts, setPosts] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    try {
      const response = await axios(
        'https://react-course-http-40bac-default-rtdb.firebaseio.com/movies.json'
      );
      console.log(response);
      setMovies(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  //   const loadedMovies = [];

  //   for (const key in data) {
  //     loadedMovies.push({
  //       id: key,
  //       title: data[key].title,
  //       openingText: data[key].openingText,
  //       releaseDate: data[key].releaseDate,
  //     });
  //   }

  return (
    <div>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <h3> Random joke generator😂 </h3>
      <p>{movies.Object}</p>
      <button onClick={fetchMoviesHandler}>Get new joke</button>
    </div>
  );
}
