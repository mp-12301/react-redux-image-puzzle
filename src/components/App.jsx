import React from "react";
import { Provider } from "react-redux";

import Store from "../store";

import Game from "./Game";

function App() {
  return (
    <Provider store={Store}>
      <Game />
    </Provider>
  );
}

export default App;
