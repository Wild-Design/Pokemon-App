import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import PokeCards from "../../components/PokeCards/PokeCards";

const Home: React.FC = () => {
  return (
    <div className='App'>
      <h2>Este es el componente Home</h2>
      <NavBar />
      <PokeCards />
      <Link to={"/"}>
        <button>Landing</button>
      </Link>
    </div>
  );
};

export default Home;
