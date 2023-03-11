import React from "react";
import { useParams } from "react-router-dom";

const PokeDetail: React.FC = () => {
  const { id } = useParams();
  return (
    <div>
      <h3>Componente Detail</h3>
    </div>
  );
};

export default PokeDetail;
