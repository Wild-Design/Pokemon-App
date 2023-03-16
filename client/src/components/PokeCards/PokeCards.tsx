import React from "react";
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
  const [pokemonPerPage, setPokemonPerPage] = useState(10);

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

  return (
    <div>
      <Paginated
        elementsPerPage={pokemonPerPage}
        allLength={ALL_POKEMONS.length}
        paginated={paginated}
      />

      {currentPokemons?.map((pokemon: any, index: number) => (
        <PokeCard
          key={index}
          imagen={pokemon.imagen}
          nombre={pokemon.nombre}
          tipos={pokemon.tipos}
        />
      ))}
    </div>
  );
};

export default PokeCards;
