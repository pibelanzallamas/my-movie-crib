import React from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";

function Login() {
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogIn(e) {
    e.preventDefault();
    axios
      .post("/api/users/login", {
        email: email.value,
        password: password.value,
      })
      .then((payload) => {
        dispatch(setUser(payload.data));
        alert(`Bienvenido ${payload.data.name}!`);
        navigate("/1");
      })
      .catch(() => alert("Datos incorrectos!"));
  }

  return (
    <div>
      <form onSubmit={handleLogIn}>
        <h3>Ingresar</h3>
        <input type="email" {...email} placeholder="Email" />
        <input type="password" {...password} placeholder="Password" />
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default Login;
