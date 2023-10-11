import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [pag, setPag] = useState(1);

  useEffect(() => {
    axios.get(`/api/movies/home/${pag}`).then((res) => {
      const allMovies = res.data;
      setMovies(allMovies);
    });
  }, [pag]);

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
      {pag > 1 ? (
        <button
          onClick={() => {
            window.scrollTo(0, 0);
            setPag(pag - 1);
          }}
        >
          Previous
        </button>
      ) : (
        <></>
      )}
      <button
        onClick={() => {
          window.scrollTo(0, 0);
          setPag(pag + 1);
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Home;
