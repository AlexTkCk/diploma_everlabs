import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import CustomLink from "./CustomLink";
import { FaRobot, FaUsers } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { themeContext } from "../context/ThemeContext";
import { themeStyles } from "../styles/themeStyles";

const Navigation = () => {
  const { themeConfig } = useContext(themeContext);

  return (
      <div
          className={`${themeConfig.secondary} ${themeStyles.themeTransitionStyle} px-3 py-2 flex items-center`}
      >
        <Link to={"/"}>
          <img src={logo} alt="" className={"h-20"} />
        </Link>
        <h1
            className={
              "text-label-lg font-light font-secondary w-36 ml-3 border-r border-black"
            }
        >
          Cherkasy Print Racing Club
        </h1>
        <div className={"flex gap-3 ml-auto px-10 w-fit"}>
          <CustomLink link={"/gameRoom"} text={"Single player"} icon={FaRobot} />
          <CustomLink
              link={"/multiplayerRoom"}
              text={"Multiplayer"}
              icon={FaUsers}
          />
          <CustomLink
              link={"/leaderboard"}
              text={"Leaderboard"}
              icon={MdLeaderboard}
          />
          <CustomLink
              link={"/account"}
              text={"Account"}
              icon={BiSolidUserAccount}
          />
        </div>
      </div>
  );
};

export default Navigation;
