import React from "react";
import AnimRoutes from "./components/AnimRoutes";
import {BrowserRouter as Router} from "react-router-dom";
import ThemeProvider from "./context/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import UserContext from "./context/UserContext";

function App() {
    return (
        <Router>
            <ThemeProvider>
                <UserContext>
                    <div className={'flex overflow-hidden h-screen w-screen flex-col'}>
                        <Navigation/>
                        <AnimRoutes/>
                        <Footer/>
                    </div>
                </UserContext>
            </ThemeProvider>
        </Router>
    );
}

export default App;
