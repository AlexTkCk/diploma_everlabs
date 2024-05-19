import React, {useContext} from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import { AnimatePresence } from "framer-motion";
import Account from "../pages/Account";
import LeaderBoard from "../pages/LeaderBoard";
import GameRoom from "../pages/GameRoom";
import MupliplayerRoom from "../pages/MultiplayerRoom";
import LoginModal from "../pages/LoginModal";
import SignUpModal from "../pages/SignUpModal";

const AnimRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode={"wait"} initial={true}>
      <Routes location={location} key={location.pathname}>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/account"} element={<Account />}></Route>
        <Route path={"/leaderboard"} element={<LeaderBoard />}></Route>
        <Route path={"/gameRoom/:room_id"} element={<GameRoom />}></Route>
        <Route path={"/multiplayerRoom"} element={<MupliplayerRoom />}></Route>
        <Route path={"/login"} element={<LoginModal/>}></Route>
        <Route path={"/login/:id/:jwt"} element={<LoginModal/>}></Route>
        <Route path={"/signup"} element={<SignUpModal />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimRoutes;
