import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Video from "../../components/Video/Video";
import style from "./Landing.module.css";
import Logo from "../../assets/logo.png";

//Pimero llamo a los tipos por las dudas que no estén en la bd y asi me prevengo de problemas
const getAllTypes = async () => {
  try {
    await axios.get("http://localhost:3001/types");
  } catch (error: any) {
    console.log({ errorLandingPage: error.message });
  }
};
getAllTypes();

const Landing: React.FC = () => {
  return (
    <div className={style.container}>
      <Video />
      <img src={Logo} alt='Logo' />
      <h2>¡Bienvenido a mi App de Pokémon!</h2>
      <div className={style.pContainer}>
        <p>
          Podrás buscar Pókemon por nombre o por pokedex, podrás crearlos,
          filtrarlos,ver sus estadisticas y ver sus verciónes en Shiny 😁
        </p>
      </div>
      <Link to={"/home"}>
        <button className={style.button85} role='button'>
          Comenzar
        </button>
      </Link>
    </div>
  );
};

export default Landing;
