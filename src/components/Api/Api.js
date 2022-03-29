import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Api() {
  const [posts, setPosts] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [totalReactPackages, setTotalReactPackages] = useState(null);

  const loadedMovies = [];

  for (const key in movies) {
    loadedMovies.push({
      id: key,
      title: movies[key].title,
      openingText: movies[key].openingText,
      releaseDate: movies[key].releaseDate,
    });
  }
  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios
      .get(
        'https://react-course-http-40bac-default-rtdb.firebaseio.com/movies.json'
      )
      .then((response) => setMovies([response.data]));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div className="card text-center m-3">
      <h5 className="card-header">GET Request with React Hooks</h5>
      {/* {movies.map((movie) => (
        <h3 key={movie.toString()} value={movie}></h3>
      ))} */}
      <div className="card-body">Total react packages: {movies.title}</div>
    </div>
  );

  // const fetchMoviesHandler = () => {
  //   return axios
  //     .get(
  //       'https://react-course-http-40bac-default-rtdb.firebaseio.com/movies.json'
  //     )
  //     .then((response) => console.log(response.data));
  // };

  // return (
  //   <div>
  //     <section>
  //       <button onClick={fetchMoviesHandler}>Fetch Movies</button>
  //       <p>{JSON.stringify(setMovies.Object)}</p>
  //     </section>
  //   </div>
  // );
}

//  const fetchMoviesHandler = async () => {
//   try {
//     const response = await axios(
//       'https://react-course-http-40bac-default-rtdb.firebaseio.com/movies.json'
//     );
//     console.log(response);
//     setMovies(response);
//   } catch (err) {
//     console.error(err);
//   }
// };
// useEffect(() => {
//   fetchMoviesHandler();
// }, []);

//   const loadedMovies = [];

//   for (const key in data) {
//     loadedMovies.push({
//       id: key,
//       title: data[key].title,
//       openingText: data[key].openingText,
//       releaseDate: data[key].releaseDate,
//     });
//   }

// const fetchMoviesHandler = () => {
//   return axios({
//     method: 'get',
//     url: 'https://react-course-http-40bac-default-rtdb.firebaseio.com/movies.json',
//     responseType: 'stream',
//   }).then((response) => JSON.stringify(console.log(response.data)));
// };
