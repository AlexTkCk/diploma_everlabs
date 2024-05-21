import { motion } from "framer-motion";
import React, {useState, useContext, useEffect} from "react";
import { pageVariants } from "../styles/variants";
import Button from "../components/Button";
import ai_img from "../assets/ai.svg";
import racer_img from "../assets/racer.svg";
import versus_img from "../assets/versus.svg";
import { FaFlagCheckered } from "react-icons/fa";
import { themeContext } from "../context/ThemeContext";
import { userContext } from "../context/UserContext";
import Marquee from "react-fast-marquee";
import {Link} from "react-router-dom";
import {serverUrl} from "../data/serverUrl";

const Home = () => {
  const { userId, userData } = useContext(userContext);
  const [games, setGames] = useState<{accuracy: number, sps: number, created_at: string}[]>([]);

  useEffect(() => {
    fetch(serverUrl + '/games_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json'
      },
      body: JSON.stringify({id: userId})
    }).then(res => res.json()).then(data => {
      setGames(data)
    })
  }, [])

  const { themeValue, themeConfig } = useContext(themeContext);
  return (
    <motion.div
      className={"grow overflow-y-hidden flex flex-col"}
      variants={pageVariants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      {!!userData ?
          <div
              className={`flex flex-row items-center justify-around gap-5 h-32 ${themeConfig.accent} overflow-hidden`}
          >
            <Marquee pauseOnHover={true} speed={100} autoFill>
              {games.length ? (
                  games.map((game) => (
                      <div
                          className={`inline-flex flex-row gap-2 justify-around items-center w-fit px-5 py-2 ${themeConfig.secondary} text-white font-bold font-primary`}
                      >
                        <p className="text-nowrap">Date: {game.created_at}</p>
                        <p className="text-nowrap">Accuracy: {game.accuracy}</p>
                        <p className="text-nowrap">SpS: {game.sps}</p>
                      </div>
                  ))
              ) : (
                  <p>Games list is empty</p>
              )}
            </Marquee>
          </div>
          :
        (
        <div
          className={
            "my-5 flex justify-between border-t border-b border-black px-5 py-2"
          }
        >
          <p className={"text-title-md font-secondary"}>
            Record your races with <b>PrintRacer Account</b>
            <br />
            <span className={"text-paragraph-lg font-primary"}>
              Save your race history, compare and improve your skills
            </span>
          </p>
          <Button
            handler={() => {}}
            buttonClassName={
              "hover:bg-black hover:text-white  transition duration-300"
            }
          >
            <Link to={'/signup'}>
              Create account
            </Link>
          </Button>
        </div>
      )}

      <div className={"py-5 grow flex justify-center gap-10"}>
        <div
          className={`skew-x-[30deg] h-full w-1/3 ${themeConfig.secondary} [transition:background-color_0.5s,_transform_0.25s] flex flex-col items-center justify-evenly py-2 ${themeConfig.hoverNeon} hover:scale-110`}
        >
          <h1
            className={
              "-skew-x-[30deg] font-primary text-title-lg w-full px-10"
            }
          >
            Typing Test
          </h1>
          <p
            className={
              "-skew-x-[30deg] font-secondary text-2xl w-full px-16"
            }
          >
            Improve your typing skills on your own
          </p>
          <div className={"-skew-x-[30deg] flex gap-5 py-2 px-16"}>
            <img className={`w-1/2 mx-auto aspect-square`} src={racer_img} />
          </div>
          <span className={"-skew-x-[30deg]"}>
            <Button
              handler={() => {}}
              buttonClassName={
                (themeValue === "black"
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-black hover:bg-white") +
                " transition-colors duration-250  text-nowrap"
              }
            >
              <Link to={'/gameRoom'} className={'flex gap-5 items-center'}>
              Practise
              <FaFlagCheckered className={"text-button"} />
              </Link>
            </Button>
          </span>
        </div>

        <div
          className={`${
            userData ? "" : "opacity-80 pointer-events-none"
          } skew-x-[30deg] h-full w-1/3 ${
            themeConfig.secondary
          } [transition:background-color_0.5s,_transform_0.25s] flex flex-col items-center justify-evenly py-2 ${
            themeConfig.hoverNeon
          } hover:scale-110`}
        >
          <h1
            className={
              "-skew-x-[30deg] font-primary text-4xl w-full px-10"
            }
          >
            Race your friends
          </h1>
          <p
            className={
              "-skew-x-[30deg] font-secondary text-2xl w-full px-16"
            }
          >
            Create your own racetrack and play with friends
          </p>
          <div className={"-skew-x-[30deg] flex gap-5 py-2 px-16"}>
            <img className={"w-1/4 aspect-square"} src={racer_img} />
            <img className={"w-1/4 aspect-square"} src={versus_img} />
            <img className={"w-1/4 aspect-square"} src={racer_img} />
          </div>
          <span className={"-skew-x-[30deg]"}>
            <Button
              handler={() => {}}
              buttonClassName={
                (themeValue === "black"
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-black hover:bg-white") +
                " transition-colors duration-250"
              }
            >
              <Link to={'/multiplayerRoom'} className={'flex gap-5 items-center'}>
                Challenge
              <div className={"flex justify-center items-center"}>
                <FaFlagCheckered
                    className={"scale-x-[-1] -rotate-45 text-button"}
                />
                <FaFlagCheckered className={"text-button rotate-45"} />
              </div>
              </Link>
            </Button>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
