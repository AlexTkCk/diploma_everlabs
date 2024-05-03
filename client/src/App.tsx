import React from "react";
import AnimRoutes from "./components/AnimRoutes";
import {BrowserRouter as Router} from "react-router-dom";
import ThemeProvider from "./context/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <ThemeProvider>
                <div className={'flex overflow-hidden h-screen w-screen flex-col'}>
                    <Navigation/>
                    <AnimRoutes/>
                    <Footer/>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
