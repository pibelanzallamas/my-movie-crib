import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const pagina = Number(useParams().page);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`/api/movies/home/${pagina}`).then((res) => {
      const allMovies = res.data;
      setMovies(allMovies);
    });
  }, [pagina]);

  return (
    <div className="home">
      <h1 className="titulo">My Movie Crib 🎬</h1>
      <div className="all">
        <div className="home-movies">
          {movies.map((movie, i) => (
            <div key={i} className="movie-poster">
              <Link to={`/movies/search/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      {pagina > 1 ? (
        <Link
          onClick={() => window.scrollTo(0, 0)}
          to={`/${pagina - 1}`}
          className="button is-info"
          style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}
        >
          Previous
        </Link>
      ) : (
        <></>
      )}
      <Link
        onClick={() => window.scrollTo(0, 0)}
        to={`/${pagina + 1}`}
        className="button is-primary"
        style={{ marginTop: "0.5rem" }}
      >
        Next
      </Link>
    </div>
  );
}

export default Home;
