import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import { GamePage } from "./game/GamePage";
import { SetupPage } from "./common/SetupPage";
import { TopBar } from "./TopBar";
import { SidePage } from "./SidePage";

const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <TopBar />
        <Container maxWidth="sm">
          <SidePage />
          <Route exact path="/">
            <SetupPage />
          </Route>

          <Route exact path="/:gameSlug/:coupleSlug">
            <GamePage />
          </Route>
        </Container>
      </BrowserRouter>
    </>
  );
};

export { App };
