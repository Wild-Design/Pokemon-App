import { Link } from "react-router-dom";
import PokeCards from "../../components/PokeCards/PokeCards";

const Home: React.FC = () => {
  return (
    <div className='App'>
      <h2>Este es el componente Home</h2>
      <PokeCards />
      <Link to={"/"}>
        <button>Landing</button>
      </Link>
    </div>
  );
};

export default Home;
