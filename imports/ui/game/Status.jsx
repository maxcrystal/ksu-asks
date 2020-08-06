import React from "react";
import { useParams } from "react-router-dom";

import Box from "@material-ui/core/Box";

const Status = () => {
  const { gameSlug, coupleSlug } = useParams();

  return (
    <Box>
      <h3>Status:</h3>
      <p>StatusComponent</p>
    </Box>
  );
};

export { Status };
