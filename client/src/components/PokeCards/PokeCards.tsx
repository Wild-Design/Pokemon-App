import React from "react";
import style from "./PokeCards.module.css";
import PokeCard from "../PokeCard/PokeCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllPokemons } from "../../features/pokemonsSlice";
import { useState, useEffect } from "react";
import Paginated from "../Paginated/Paginated";

const PokeCards: React.FC = () => {
  const dispatch = useAppDispatch();
  const ALL_POKEMONS = useAppSelector(
    (state) => state.pokemonsSlice.allPokemons
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(9);

  const indexFromEndPokemon = currentPage * pokemonPerPage;
  const indexFromFirstPokemon = indexFromEndPokemon - pokemonPerPage;
  const currentPokemons = ALL_POKEMONS.slice(
    indexFromFirstPokemon,
    indexFromEndPokemon
  );

  const paginated = (numberThePage: number) => {
    setCurrentPage(numberThePage);
  };

  useEffect(() => {
    if (!ALL_POKEMONS.length) {
      dispatch(getAllPokemons());
    }
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [ALL_POKEMONS]);

  return (
    <div className={style.container}>
      <Paginated
        elementsPerPage={pokemonPerPage}
        allLength={ALL_POKEMONS.length}
        paginated={paginated}
      />
      {currentPokemons.length ? (
        <div className={style.cardsContainer}>
          {currentPokemons?.map((pokemon: any) => (
            <PokeCard
              key={pokemon.nombre}
              id={pokemon.id}
              imagen={pokemon.imagen}
              nombre={pokemon.nombre}
              tipos={pokemon.tipos}
            />
          ))}
        </div>
      ) : (
        <p>CARGANDO LOS BICHO</p>
      )}
    </div>
  );
};

export default PokeCards;
