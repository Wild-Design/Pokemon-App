import React from "react";
interface Props {
  imagen: string;
  nombre: string;
  tipos: any[];
}

const PokeCard = ({ imagen, nombre, tipos }: Props) => {
  return (
    <div>
      <img src={imagen[0]} alt={nombre} />
      <h3>Nombre: {nombre}</h3>
      <ul>
        {tipos?.map((tipo, index: number) => (
          <li key={index}>{tipo}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokeCard;
