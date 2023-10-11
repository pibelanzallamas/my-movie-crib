import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function Pelicula() {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const uid = useSelector((state) => state.user.id);

  useEffect(() => {
    axios
      .get(`/api/movies/search/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setMovie(data);
      })
      .catch(() => {});
  }, [id]);

  function handleLike(mid) {
    axios
      .post("/api/favorites/register", { mid, uid })
      .then((fav) => {
        if (fav.data[1]) {
          alert("likeado!");
        } else {
          alert("ya en likes!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!movie.id) return <h3>No hay datos</h3>;

  return (
    <div className="container" style={{ marginTop: "1rem" }}>
      <div className="columns">
        <div className="column is-one-quarter">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="column">
          <p className="title is-4">{movie.title}</p>
          <p className="content">{movie.overview}</p>
          <p className="subtitle is-6">Genre: {movie.genres[0].name}</p>
          <p className="subtitle is-6">Duration: {movie.runtime}min</p>
          <p className="subtitle is-6">Release Data: {movie.release_date}</p>

          {movie.homepage ? (
            <p className="subtitle is-6">
              Webpage: {` `}
              <a target="_blank" rel="noreferrer" href={`${movie.homepage}`}>
                {movie.homepage}
              </a>
            </p>
          ) : (
            <></>
          )}

          {uid ? (
            <button
              onClick={() => {
                handleLike(movie.id);
              }}
              className="button is-primary"
            >
              Like!
            </button>
          ) : (
            <button
              onClick={() => {
                handleLike(movie.id);
              }}
              className="button is-info"
            >
              Disike!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pelicula;
