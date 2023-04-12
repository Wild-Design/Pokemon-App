import Search from "../Search/Search";
import {
  getAllPokemons,
  getAllTypes,
  orderPokemons,
  filterPokemons,
  cleanPokemons,
} from "../../features/pokemonsSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import Logo from "../../assets/logo.png";

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

  const handleFilter = (event: any) => {
    const value = event.target.value;
    dispatch(filterPokemons(value));
  };
  const cleanState = () => {
    dispatch(cleanPokemons());
    dispatch(getAllPokemons());
  };

  return (
    <nav className={style.nav}>
      <div className={style.firstContainer}>
        <Link to={"/"}>
          <button className={style.btnInicio}>Inicio</button>
        </Link>
        <img className={style.logo} src={Logo} alt='Logo' />
        <Link to={"/create"}>
          <button className={style.btnCreate}>Crear Pokemon</button>
        </Link>
      </div>
      <div className={style.secondContainer}>
        <button className={style.reset} onClick={cleanState}>
          Resetear <br />
        </button>
        <div className={style.searchContainer}>
          <Search
            labelName={"Busca un pokemon"}
            buttonName={"🔍"}
            actionName={getAllPokemons}
          />
        </div>
        <div className={style.filtersContainer}>
          <div className={style.order}>
            <label htmlFor='order'>Ordenar por:</label>
            <select onChange={(event) => handleSelectChange(event)} id='order'>
              <option value={""}>--Elije una opción--</option>
              <option value='AZ'>A-Z</option>
              <option value='ZA'>Z-A</option>
              <option value='MAYOR-ATAQUE'>Mayor Ataque</option>
              <option value='MENOR-ATAQUE'>Menor Ataque</option>
            </select>
          </div>
          <div className={style.types}>
            <label htmlFor='filterTypes'>Filtrar por tipo:</label>
            <select
              onChange={(e) => {
                handleFilter(e);
              }}
              id='filterTypes'
            >
              <option value=''>--Elige un tipo--</option>
              {ALL_TYPES.length ? (
                ALL_TYPES.map((tipo: any) => (
                  <option key={tipo.id}>{tipo.id}</option>
                ))
              ) : (
                <option value=''></option>
              )}
            </select>
          </div>
          <div className={style.filter}>
            <label htmlFor='filter'>Más filtros:</label>
            <select
              onChange={(event) => {
                handleFilter(event);
              }}
              id='filter'
            >
              <option value={""}>--Elige una opción--</option>
              <option value={"ALL"}>Todos</option>
              <option value='DB'>Creados</option>
              <option value='API'>Existentes</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
