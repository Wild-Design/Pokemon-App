import NavBar from "../../components/NavBar/NavBar";
import PokeCards from "../../components/PokeCards/PokeCards";
import style from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={style.home}>
      <NavBar />
      <PokeCards />
    </div>
  );
};

export default Home;
