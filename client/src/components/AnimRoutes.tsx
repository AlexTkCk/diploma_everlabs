import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "../pages/Home";
import {AnimatePresence} from "framer-motion";
import Account from "../pages/Account";
import LeaderBoard from "../pages/LeaderBoard";
import GameRoom from "../pages/GameRoom";

const AnimRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode={'wait'} initial={true}>
            <Routes location={location} key={location.pathname}>
                <Route path={'/'} element={<Home/>}></Route>
                <Route path={'/account'} element={<Account/>}></Route>
                <Route path={'/leaderboard'} element={<LeaderBoard/>}></Route>
                <Route path={'/gameRoom'} element={<GameRoom/>}></Route>
            </Routes>
        </AnimatePresence>
    );
};

export default AnimRoutes;