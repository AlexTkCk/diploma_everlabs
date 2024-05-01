import React from "react";
import AnimRoutes from "./components/AnimRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import CustomLink from "./components/CustomLink";
import { FaUserAlt } from "react-icons/fa";

function App() {
  return (
    <>
      <Router>
        <div>Future navigation</div>
        <AnimRoutes />
        <div>Future footer</div>
      </Router>
    </>
  );
}

export default App;
