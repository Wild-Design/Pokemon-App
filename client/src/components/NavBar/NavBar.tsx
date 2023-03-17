import Search from "../Search/Search";
import { getAllPokemons } from "../../features/pokemonsSlice";

const NavBar = () => {
  return (
    <nav>
      <Search
        labelName={"Busca un pokemon"}
        buttonName={"🔍"}
        actionName={getAllPokemons}
      />
    </nav>
  );
};

export default NavBar;
