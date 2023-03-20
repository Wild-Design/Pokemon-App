import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { pokemonDetail } from "../../features/pokemonsSlice";
import Loader from "../../assets/loaders/loading.45600eb9.gif";
import { useNavigate } from "react-router-dom";

const PokeDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(pokemonDetail(id));
  }, [dispatch]);

  const DETAIL: any = useAppSelector(
    (state) => state.pokemonsSlice.pokemonDetail
  );

  const navigate = useNavigate();
  const backHome = () => {
    dispatch(pokemonDetail(""));
    navigate("/home");
  };

  return Object.entries(DETAIL).length ? (
    <div>
      <button onClick={backHome}>Atras</button>
      <h3>Nombre: {DETAIL.nombre}</h3>
      <p>Id: {DETAIL.id}</p>
      <p>Vida: {DETAIL.vida}</p>
      {DETAIL.imagen ? (
        <img src={DETAIL.imagen[0]} alt={DETAIL.id} />
      ) : (
        <span>Sin imagen</span>
      )}

      <p>Tipos:</p>
      <ul>
        {DETAIL.tipos?.map((tipo: string, index: number = 8000) => {
          return <li key={index}>{tipo}</li>;
        })}
      </ul>
      <p>Ataque: {DETAIL.ataque}</p>
      <p>Defensa: {DETAIL.defensa}</p>
      <p>Velocidad: {DETAIL.velocidad}</p>
      <p>Altura: {DETAIL.altura}</p>
      <p>Peso: {DETAIL.peso}</p>
    </div>
  ) : (
    <img src={Loader} alt='Loader' />
  );
};

export default PokeDetail;
