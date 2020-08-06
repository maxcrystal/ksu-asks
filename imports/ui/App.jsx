import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import { GamePage } from "./game/GamePage";
import { SetupPage } from "./common/SetupPage";
import { TopBar } from "./TopBar";
import { SidePage } from "./SidePage";

const App = () => {
  return (
    <Box
      height="100%"
      width="100vw"
      position="fixed"
      display="flex"
      flexDirection="column"
      margin="auto"
      justifyContent="stretch"
    >
      <CssBaseline />
      <BrowserRouter>
        <TopBar />
        <SidePage />
        <Container
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <Route exact path="/">
            <SetupPage />
          </Route>
          <Route exact path="/:gameSlug/:coupleSlug">
            <GamePage />
          </Route>
        </Container>
      </BrowserRouter>
    </Box>
  );
};

export { App };
