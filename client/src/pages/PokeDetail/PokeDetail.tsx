import React, { useEffect, useState } from "react";
import style from "./PokeDetail.module.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { pokemonDetail } from "../../features/pokemonsSlice";
import Loader from "../../assets/loaders/loading.45600eb9.gif";
import { useNavigate } from "react-router-dom";
import Fondo from "../../assets/pokemon-wallpapers-3.png";
import { HiOutlineArrowLeft } from "react-icons/hi";
import TYPES from "../../utils/importTypes";

const PokeDetail: React.FC = () => {
  const { id }: any = useParams();
  const dispatch = useAppDispatch();

  const DETAIL: any = useAppSelector(
    (state) => state.pokemonsSlice.pokemonDetail
  );

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

  const [prevNext, setPrevNext] = useState(id.length > 4 ? id : parseInt(id));
  const [db, setDb] = useState(false);

  const handlePrev = () => {
    if (prevNext > 1) {
      setPrevNext(prevNext - 1);
    }
  };
  const handleNext = () => {
    if (prevNext < 1010) {
      setPrevNext(prevNext + 1);
    }
  };
  useEffect(() => {
    if (id.length > 4) {
      setDb(true);
    }
    dispatch(pokemonDetail(prevNext));
    navigate(`/pokedetail/${prevNext}`);
  }, [dispatch, prevNext]);

  return Object.entries(DETAIL).length ? (
    <>
      <span className={style.back} onClick={backHome}>
        {<HiOutlineArrowLeft />}
      </span>
      <img className={style.fondo} src={Fondo} alt='Fondo' />
      <div className={style.container}>
        <div className={!db ? style.prevNextContainer : style.none}>
          <button onClick={handlePrev}>🡸 Anterior</button>
          <button onClick={handleNext}>🡺 Siguiente</button>
        </div>
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
              {DETAIL.tipos?.map((tipos: any) => {
                return (
                  <img
                    key={tipos}
                    className={style.type}
                    src={TYPES.find((img) => {
                      if (img.includes(tipos)) {
                        return img;
                      }
                      img;
                    })}
                    alt={`imagen: ${tipos}`}
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
