import React, { useEffect, useState } from "react";
import style from "./PokeDetail.module.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { pokemonDetail } from "../../features/pokemonsSlice";
import Loader from "../../assets/loaders/loading.45600eb9.gif";
import { useNavigate } from "react-router-dom";
import imgTypes from "../../utils/imgTypes";
import Fondo from "../../assets/pokemon-wallpapers-3.png";
import { HiOutlineArrowLeft } from "react-icons/hi";

const PokeDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const DETAIL: any = useAppSelector(
    (state) => state.pokemonsSlice.pokemonDetail
  );
  useEffect(() => {
    dispatch(pokemonDetail(id));
  }, [dispatch]);

  const [vida, setVida] = useState(0);
  const [ataque, setAtaque] = useState(0);
  const [defensa, setDefensa] = useState(0);
  const [velocidad, setVelocidad] = useState(0);

  useEffect(() => {
    setVida(DETAIL.vida);
    setAtaque(DETAIL.ataque);
    setDefensa(DETAIL.defensa);
    setVelocidad(DETAIL.velocidad);
  }, [DETAIL]);

  const navigate = useNavigate();
  const backHome = () => {
    dispatch(pokemonDetail(""));
    navigate("/home");
  };

  return Object.entries(DETAIL).length ? (
    <>
      <span className={style.back} onClick={backHome}>
        {<HiOutlineArrowLeft />}
      </span>
      <img className={style.fondo} src={Fondo} alt='Fondo' />
      <div className={style.container}>
        <div className={style.pokemonContainer}>
          <div className={style.coso}>
            <div className={style.statsContainer}>
              <div className={style.spanAndPorsentualContainer}>
                <span>Vida: {DETAIL.vida}</span>{" "}
                <div className={style.porcentualContainer}>
                  <div
                    style={{
                      height: "100%",
                      backgroundColor: "#77f",
                      width: `${(vida / 250) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className={style.spanAndPorsentualContainer}>
                <span>Ataque: {DETAIL.ataque}</span>{" "}
                <div className={style.porcentualContainer}>
                  <div
                    style={{
                      height: "100%",
                      backgroundColor: "#c00",
                      width: `${(ataque / 250) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className={style.spanAndPorsentualContainer}>
                <span>Defensa: {DETAIL.defensa}</span>{" "}
                <div className={style.porcentualContainer}>
                  <div
                    style={{
                      height: "100%",
                      backgroundColor: "#4f4",
                      width: `${(defensa / 250) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className={style.spanAndPorsentualContainer}>
                <span>Velocidad: {DETAIL.velocidad}</span>{" "}
                <div className={style.porcentualContainer}>
                  <div
                    style={{
                      height: "100%",
                      backgroundColor: "#f00",
                      width: `${(velocidad / 250) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className={style.pesoAltura}>
              <span>Altura: {DETAIL.altura}</span>
              <span>Peso: {DETAIL.peso}</span>
            </div>
            <div className={style.typesContainer}>
              <p>Tipos:</p>
              {DETAIL.tipos?.map((tipos: any, index: number) => {
                const URL: any = imgTypes.find((e) => {
                  if (e.nombre === tipos) {
                    return e.imagen;
                  }
                });
                return (
                  <img
                    className={style.type}
                    key={index}
                    src={URL.imagen}
                    alt={URL.nombre}
                  />
                );
              })}
            </div>
          </div>

          <div className={style.rightContainer}>
            <h2>{DETAIL.nombre}</h2>
            <span>Pokedex: {DETAIL.id}</span>
            {DETAIL.imagen ? (
              <img src={DETAIL.imagen[0]} alt={DETAIL.id} />
            ) : (
              <span>Sin imagen</span>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <img src={Loader} alt='Loader' />
  );
};

export default PokeDetail;
