import React, { useEffect, useState } from "react";
import style from "./PokeDetail.module.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { pokemonDetail } from "../../features/pokemonsSlice";
import Loader from "../../assets/loaders/loading.45600eb9.gif";
import { useNavigate } from "react-router-dom";

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
    <div className={style.container}>
      <button onClick={backHome}>Atras</button>

      <div className={style.pokemonContainer}>
        <div>
          <div className={style.statsContainer}>
            <div className={style.spanAndPorsentualContainer}>
              <span>Vida: {DETAIL.vida}</span>{" "}
              <div className={style.porcentualContainer}>
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "#f00",
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
                    backgroundColor: "#f00",
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
                    backgroundColor: "#f00",
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

          <span>Altura: {DETAIL.altura}</span>
          <span>Peso: {DETAIL.peso}</span>
          <div className={style.typesContainer}>
            <p>Tipos:</p>
            <ul>
              {DETAIL.tipos?.map((tipo: string, index: number = 8000) => {
                return <li key={index}>{tipo}</li>;
              })}
            </ul>
          </div>
        </div>

        <div className={style.rightContainer}>
          <h3>Nombre: {DETAIL.nombre}</h3>
          <span>Id: {DETAIL.id}</span>
          {DETAIL.imagen ? (
            <img src={DETAIL.imagen[0]} alt={DETAIL.id} />
          ) : (
            <span>Sin imagen</span>
          )}
        </div>
      </div>
    </div>
  ) : (
    <img src={Loader} alt='Loader' />
  );
};

export default PokeDetail;
