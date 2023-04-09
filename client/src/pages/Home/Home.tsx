import NavBar from "../../components/NavBar/NavBar";
import PokeCards from "../../components/PokeCards/PokeCards";

const Home: React.FC = () => {
  return (
    <div className='App'>
      <NavBar />
      <PokeCards />
    </div>
  );
};

export default Home;
