import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className='App'>
      <h2>Este es el componente Home</h2>
      <Link to={"/"}>
        <button>Landing</button>
      </Link>
    </div>
  );
};

export default Home;
