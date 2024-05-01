import React from "react";
import AnimRoutes from "./components/AnimRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import CustomLink from "./components/CustomLink";
import { FaUserAlt } from "react-icons/fa";

function App() {
    return (
        <Router>
            <div className={'flex overflow-hidden h-screen w-screen flex-col'}>
                <div className={'h-20 bg-gray-200'}>Future navigation</div>
                <AnimRoutes/>
                <div className={'h-20 bg-gray-200'}>Future footer</div>
            </div>
        </Router>
    );
}

export default App;
