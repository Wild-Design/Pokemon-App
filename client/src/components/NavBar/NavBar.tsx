import Search from "../Search/Search";
import {
  getAllPokemons,
  getAllTypes,
  orderPokemons,
} from "../../features/pokemonsSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";

const NavBar = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  const ALL_TYPES = useAppSelector((state) => state.pokemonsSlice.allTypes);

  const handleSelectChange = (event: any) => {
    const value = event.target.value;
    dispatch(orderPokemons(value));
  };

  return (
    <nav>
      <h2>Pokemon App</h2>

      <Search
        labelName={"Busca un pokemon"}
        buttonName={"🔍"}
        actionName={getAllPokemons}
      />

      <label htmlFor='order'>Ordenar por:</label>
      <select onChange={(e) => handleSelectChange(e)} id='order'>
        <option value={""}>--Elije una opción--</option>
        <option value='AZ'>A-Z</option>
        <option value='ZA'>Z-A</option>
        <option value='MAYOR-ATAQUE'>Mayor Ataque</option>
        <option value='MENOR-ATAQUE'>Menor Ataque</option>
      </select>

      <label htmlFor='filterTypes'>Filtrar por tipo:</label>
      <select id='filterTypes'>
        <option value=''>--Elige un tipo--</option>
        {ALL_TYPES.length ? (
          ALL_TYPES.map((tipo: any) => (
            <option key={tipo.id}>{tipo.nombre}</option>
          ))
        ) : (
          <option value=''></option>
        )}
      </select>

      <label htmlFor='filter'>Filtrar por:</label>
      <select id='filter'>
        <option value={""}>--Elige una opción--</option>
        <option value='created'>Creados</option>
        <option value='existent'>Existentes</option>
      </select>
    </nav>
  );
};

export default NavBar;
