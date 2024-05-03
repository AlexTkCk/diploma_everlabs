import React from "react";
import { pageVariants } from "../styles/variants";
import { motion } from "framer-motion";
import Row from "../components/Row";

const LeaderBoard = () => {
  return (
    <motion.div
      className={"grow overflow-y-hidden flex flex-col px-5 py-3"}
      variants={pageVariants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      <input
        placeholder="Find a player"
        type="search"
        className="w-1/4 p-2 mx-auto mb-5 border-2 border-black rounded-2xl"
      />
      <div className="flex flex-row gap-10 w-full grow font-secondary min-h-0">
        <div className="w-3/4 h-full border-2 border-black flex flex-col rounded-2xl py-5 px-2">
          <div className="flex flex-row justify-around pb-2 text-xl font-bold">
            <span className="w-1/3 text-center ">Name</span>
            <span className="w-1/3 text-center">Speed</span>
            <span className="w-1/3 text-center">Time</span>
          </div>
          <hr className="border-black" />
          <div
            className={
              "grow overflow-y-scroll scrollbar-thin scrollbar-thumb-[#339989] scrollbar-track-slate-100"
            }
          >
            <div className={"h-[3000px] flex flex-col gap-5"}>
              <hr className="border-black" />
              <Row name={"Player 1"} speed={"123"} time={"123"} />
              <Row name={"Player 1"} speed={"123"} time={"123"} />
              <Row name={"Player 1"} speed={"123"} time={"123"} />
              <Row name={"Player 1"} speed={"123"} time={"123"} />
              <Row name={"Player 1"} speed={"123"} time={"123"} />
            </div>
          </div>
        </div>

        <div className="w-1/4 h-full border-2 border-black rounded-2xl py-5 px-2 font-primary flex flex-col gap-3 items-center">
          <span className="text-center text-3xl">Filter</span>
          <hr className="border-black w-full" />
          <div className="flex gap-5 text-2xl">
            <label htmlFor="rt">Race type</label>
            <input type="checkbox" id="rt" />
          </div>
          <div className="flex gap-5 text-2xl">
            <label htmlFor="ms">My scores</label>
            <input type="checkbox" id="ms" />
          </div>
          <div className="flex gap-5 text-2xl">
            <label htmlFor="comp">Competitions</label>
            <input type="checkbox" id="comp" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeaderBoard;
