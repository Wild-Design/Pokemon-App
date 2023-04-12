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
import { BsStars } from "react-icons/bs";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import Swal from "sweetalert2";

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

  const [indexImage, setIndexImage] = useState(0);
  const [normalShiny, setNormalShiny] = useState("Shiny");
  const handleIndexImage = () => {
    normalShiny === "Shiny"
      ? setNormalShiny("Normal")
      : setNormalShiny("Shiny");

    if (DETAIL.imagen[1])
      return indexImage === 0 ? setIndexImage(1) : setIndexImage(0);
  };

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

  const [search, setSearch] = useState(prevNext);
  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setSearch(value);
  };
  const handleSearch = (event: any) => {
    event.preventDefault();

    search[0] == 0 || search <= 0 || search >= 1011
      ? Swal.fire(
          "En total existen 1010 Pokémon. \n busca solo entre esos numeros"
        )
      : setPrevNext(parseInt(search));
  };

  return Object.entries(DETAIL).length ? (
    <>
      <span className={style.back} onClick={backHome}>
        {<HiOutlineArrowLeft />}
      </span>
      <img className={style.fondo} src={Fondo} alt='Fondo' />
      <div className={style.container}>
        <form onSubmit={handleSearch}>
          <label htmlFor='pokedex'>
            <input
              className={style.coso}
              onChange={handleInputChange}
              type='number'
              id='pokedex'
              placeholder='N° Pokedex 🔍'
            />
          </label>
        </form>
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
              {DETAIL.tipos?.map((tipos: string) => {
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
            {!DETAIL.imagen || !DETAIL.imagen[1] ? (
              <span className={style.noShiny} onClick={handleIndexImage}>
                {<BsStars />}
              </span>
            ) : (
              <span
                className={
                  normalShiny === "Shiny"
                    ? style.buttonShiny
                    : style.buttonNormal
                }
                onClick={handleIndexImage}
              >
                {normalShiny === "Shiny" ? <BsStars /> : <CgSpinnerTwoAlt />}
              </span>
            )}
            {DETAIL.imagen ? (
              <img
                src={DETAIL.imagen[indexImage] || DETAIL.imagen[0]}
                alt={DETAIL.id}
              />
            ) : (
              <span>Sin imagen</span>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <img className={style.fondo} src={Fondo} alt='Fondo' />
      <img className={style.loader} src={Loader} alt='Loader' />
    </>
  );
};

export default PokeDetail;
