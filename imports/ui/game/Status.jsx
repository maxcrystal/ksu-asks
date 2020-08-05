import React from "react";
import { useParams } from "react-router-dom";

const Status = () => {
  const { gameSlug, coupleSlug } = useParams();

  return (
    <div>
      <h3>Status:</h3>
      <p>StatusComponent</p>
    </div>
  );
};

export { Status };
