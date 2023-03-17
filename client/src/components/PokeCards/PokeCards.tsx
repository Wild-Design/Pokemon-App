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
    dispatch(getAllPokemons());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [ALL_POKEMONS]);

  return (
    <div>
      <Paginated
        elementsPerPage={pokemonPerPage}
        allLength={ALL_POKEMONS.length}
        paginated={paginated}
      />
      <div className={style.cardsContainer}>
        {currentPokemons?.map((pokemon: any, index: number) => (
          <PokeCard
            key={pokemon.nombre}
            id={pokemon.id}
            imagen={pokemon.imagen}
            nombre={pokemon.nombre}
            tipos={pokemon.tipos}
          />
        ))}
      </div>
    </div>
  );
};

export default PokeCards;
