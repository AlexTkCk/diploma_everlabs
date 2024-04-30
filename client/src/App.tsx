import React from "react";
import AnimRoutes from "./components/AnimRoutes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>Future navigation</div>
      <AnimRoutes />
      <div>Testing footer some text</div>
    </Router>
  );
}

export default App;
