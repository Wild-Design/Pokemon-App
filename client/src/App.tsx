import "./App.css";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import CreatePokemon from "./pages/CreatePokemon/CreatePokemon";
import PokeDetail from "./pages/PokeDetail/PokeDetail";

const App: React.FC = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/pokeDetail/:id' element={<PokeDetail />} />
        <Route path='/create' element={<CreatePokemon />} />
      </Routes>
    </div>
  );
};

export default App;
