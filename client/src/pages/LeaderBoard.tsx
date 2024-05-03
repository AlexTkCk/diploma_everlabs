import React from "react";
import { pageVariants } from "../styles/variants";
import { motion } from "framer-motion";

const LeaderBoard = () => {
  return (
    <motion.div
      className={"grow overflow-y-hidden flex flex-col"}
      variants={pageVariants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      <div className="w-full h-full flex flex-col gap-5 px-10 py-2 items-center font-primary">
        <input
          placeholder="Find a player"
          type="search"
          className="w-1/4 h-12 p-4 border-2 border-black rounded-2xl"
        />
        <div className="flex flex-row gap-10 w-full h-auto grow font-secondary">
          <div className="w-3/4 h-full border-2 border-black rounded-2xl py-5 px-2">
            <div className="flex flex-row justify-around pb-2 text-xl font-bold">
              <span className="w-1/3 text-center ">Name</span>
              <span className="w-1/3 text-center">Speed</span>
              <span className="w-1/3 text-center">Time</span>
            </div>
            <hr className="border-black" />
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
      </div>
    </motion.div>
  );
};

export default LeaderBoard;
