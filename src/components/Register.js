import React from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router";

function Register() {
  const email = useInput();
  const password = useInput();
  const name = useInput();
  const lastname = useInput();
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    axios
      .post(`/api/users/register`, {
        email: email.value,
        password: password.value,
        name: name.value,
        lastname: lastname.value,
      })
      .then((user) => {
        if (user.data[1]) {
          alert("El usuario ha sido creado!");
          navigate("/users/login");
        } else if (user.data[1] === false) {
          alert("El usuario ya existe!");
        } else {
          alert("Ingreso datos incorrectos!");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <form onSubmit={handleRegister}>
        <h3>Registrarse</h3>
        <input {...email} type="email" placeholder="Email" />
        <input {...password} type="password" placeholder="Password" />
        <input {...name} placeholder="Nombre" />
        <input {...lastname} placeholder="Apellido" />
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default Register;
