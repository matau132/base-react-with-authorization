import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import RenderRoutes, { routes } from "./routes/routes";

function App() {
  const currentUser = undefined;
  const loading = false;

  return (
    <>
      <Router basename="">
        <RenderRoutes
          routes={routes}
          currentUser={currentUser}
          loading={loading}
        />
      </Router>
    </>
  );
}

export default App;
