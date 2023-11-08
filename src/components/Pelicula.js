import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function Pelicula() {
  const { id } = useParams();
  const uid = useSelector((state) => state.user.id);
  const [like, setLike] = useState(false);
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/movies/search/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setMovie(data);
      })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    axios
      .get("/api/favorites/find", { params: { mid: movie.id, uid } })
      .then((fav) => {
        if (fav.data.movieId) setLike(true);
        else setLike(false);
      })
      .catch((err) => console.log(err));
  }, [uid, movie]);

  function handleLike(mid) {
    axios
      .post("/api/favorites/register", { mid, uid })
      .then((fav) => {
        if (fav.data[1]) {
          alert("likeado!");
          setLike(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDislike(mid) {
    axios
      .post("/api/favorites/delete", { mid, uid })
      .then((fav) => {
        if (fav.data[1]) {
          alert("dislikeado!");
          setLike(false);
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
            like ? (
              <button
                onClick={() => {
                  handleDislike(movie.id);
                }}
                className="button is-info"
              >
                Disike!
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLike(movie.id);
                }}
                className="button is-primary"
              >
                Like!
              </button>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pelicula;
