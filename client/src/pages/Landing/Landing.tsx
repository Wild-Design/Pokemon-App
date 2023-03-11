import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//Pimero llamo a los tipos por las dudas que no estén en la bd y asi me prevengo de problemas
const getAllTypes = async () => {
  try {
    await axios.get("http://localhost:3001/types");
  } catch (error: any) {
    console.log({ errorLandingPage: error.message });
  }
};
getAllTypes();

const Landing: React.FC = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link to={"/home"}>
        <button>Home</button>
      </Link>
    </div>
  );
};

export default Landing;
