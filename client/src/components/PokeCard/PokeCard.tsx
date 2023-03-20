import React, { useEffect, useState } from "react";
import style from "./PokeCard.module.css";
import Loader from "../../assets/loaders/loading.45600eb9.gif";
import { useNavigate } from "react-router-dom";
interface Props {
  id: string | number;
  imagen: string;
  nombre: string;
  tipos: any[];
}

//
import imgTypes from "../../utils/imgTypes";
//

const PokeCard = ({ id, imagen, nombre, tipos }: Props) => {
  const navigate = useNavigate();

  const [indexImage, setIndexImage] = useState(0);
  const [normalShiny, setNormalShiny] = useState("Shiny"); //solo uso para setear el nombre del boton a normal si esta en shiny y viceversa

  const handleIndexImage = () => {
    normalShiny === "Shiny"
      ? setNormalShiny("Normal")
      : setNormalShiny("Shiny");

    if (imagen[1])
      return indexImage === 0 ? setIndexImage(1) : setIndexImage(0);
  };

  return (
    <div>
      <img src={imagen[indexImage] || imagen[0]} alt={nombre} />
      <h3>Nombre: {nombre}</h3>
      {!imagen[1] ? (
        <button disabled onClick={handleIndexImage}>
          No Shiny
        </button>
      ) : (
        <button onClick={handleIndexImage}>{normalShiny}</button>
      )}
      <ul>
        {tipos?.map((tipo, index: number) => (
          <li key={index}>{tipo}</li>
        ))}
      </ul>
      <button onClick={() => navigate(`/pokeDetail/${id}`)}>
        Mas Detalles
      </button>
    </div>
  );
};

export default PokeCard;
