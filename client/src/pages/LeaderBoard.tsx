import React, { useState } from "react";
import { pageVariants } from "../styles/variants";
import { motion } from "framer-motion";
import Row from "../components/Row";
import Checkbox from "../components/CheckBox";
import dataLB from "../data/leaderboardData.json";

const LeaderBoard = () => {
  const [data, setData] = useState(dataLB);
  const [searchData, setSearchData] = useState("");

  const handleSearch = (e: any) => {
    setSearchData(e.target.value);
  };

  const filteredData = data.filter((player) =>
    player.name.toLowerCase().includes(searchData.toLowerCase())
  );

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
        type="text"
        onChange={handleSearch}
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
              {/* {data.length ? (
                data.map((dataLB) => <Row key={dataLB.id} dataLB={dataLB} />)
              ) : (
                <p>No data</p>
              )} */}
              {filteredData.map((player) => (
                <Row key={player.id} dataLB={player} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/4 h-full border-2 border-black rounded-2xl py-5 px-2 font-primary flex flex-col gap-3 items-center">
          <span className="text-center text-3xl">Filter</span>
          <hr className="border-black w-full" />
          <Checkbox value="Speed" id="rt" />
          <Checkbox value="Time" id="ms" />
        </div>
      </div>
    </motion.div>
  );
};

export default LeaderBoard;
