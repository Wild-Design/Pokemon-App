import React, { useEffect, useState } from "react";
import style from "./PokeCard.module.css";
import { useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import TYPES from "../../utils/importTypes";

interface Props {
  id: string | number;
  imagen: string;
  nombre: string;
  tipos: any[];
}

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
    <div className={style.cardContainer}>
      <div className={style.info}>
        <h3>{nombre}</h3>
        {!imagen[1] ? (
          <span className={style.noShiny} onClick={handleIndexImage}>
            {<BsStars />}
          </span>
        ) : (
          <span
            className={
              normalShiny === "Shiny" ? style.buttonShiny : style.buttonNormal
            }
            onClick={handleIndexImage}
          >
            {normalShiny === "Shiny" ? <BsStars /> : <CgSpinnerTwoAlt />}
          </span>
        )}
        <div className={style.typesContainer}>
          {tipos?.map((tipo: any) => {
            return (
              <img
                key={tipo}
                className={style.typeImg}
                src={TYPES.find((img) => {
                  if (img.includes(tipo)) {
                    return img;
                  }
                  img;
                })}
                alt={`imagen: ${tipo}`}
              />
            );
          })}
        </div>
      </div>
      <img
        className={style.pokeImg}
        src={imagen[indexImage] || imagen[0]}
        alt={nombre}
        onClick={() => navigate(`/pokeDetail/${id}`)}
      />
    </div>
  );
};

export default PokeCard;
