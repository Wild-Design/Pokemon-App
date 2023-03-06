import React from "react";

interface Cosometro {
  nombre?: string;
  coso?: any;
}

const Coso: React.FC = (props: Cosometro) => {
  return (
    <div>
      <h1>Tituluo</h1>
    </div>
  );
};

export default Coso;
