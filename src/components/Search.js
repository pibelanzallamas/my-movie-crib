import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Search() {
  const { name } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/movies/${name}`)
      .then((res) => {
        setMovies(res.data);
        console.log("data", res.data);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, [name]);

  if (movies.length < 1) return <h3>No se encontraron resultados.</h3>;

  return (
    <div>
      <div className="container">
        <div className="columns is-multiline">
          {movies.map((movie, i) => (
            <div key={i} className="column is-one-fifth">
              <Link to={`/movies/search/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
