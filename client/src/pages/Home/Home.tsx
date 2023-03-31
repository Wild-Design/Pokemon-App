import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import PokeCards from "../../components/PokeCards/PokeCards";

const Home: React.FC = () => {
  return (
    <div className='App'>
      <NavBar />
      <PokeCards />
      <Link to={"/"}>
        <button>Landing</button>
      </Link>
    </div>
  );
};

export default Home;
