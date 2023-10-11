import React, { useEffect } from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";

function Navbar() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = useInput();

  function handleLogout(e) {
    e.preventDefault();
    const initialState = {
      name: null,
      lastname: null,
      email: null,
    };
    axios
      .post("/api/users/logout")
      .then(() => {
        dispatch(setUser(initialState));
        navigate("/");
      })
      .catch((err) => {
        console.log("error: ", err);
        navigate("/");
      });
  }

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((cok) => dispatch(setUser(cok.data)))
      .catch();
  }, [dispatch]);

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/movies/${search.value}`);
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to={"/"}>
          <img
            src="https://imagizer.imageshack.com/img924/3506/mAccSe.png"
            width="30"
            height="40"
            alt="logo"
          ></img>
          <p>THE MOVIE DATABASE</p>
        </Link>
        <form onSubmit={handleSearch}>
          <input
            {...search}
            className="input"
            type="text"
            placeholder="Buscar pelicula"
          />
        </form>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {user.name ? (
              <div>
                <Link to={`/users/${user.id}`}>
                  <p className="button is-primary">
                    <strong>{user.name}</strong>
                  </p>
                </Link>
                <button onClick={handleLogout} className="button is-light">
                  Log out
                </button>
              </div>
            ) : (
              <div>
                <Link to={"/users/register"}>
                  <p className="button is-primary">
                    <strong>Register</strong>
                  </p>
                </Link>
                <Link to={"/users/login"}>
                  <p className="button is-light">Log in</p>
                </Link>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
