import React, { useState, useEffect } from "react";
import { pageVariants } from "../styles/variants";
import { motion } from "framer-motion";
import Checkbox from "../components/CheckBox";
import RowMp from "../components/RowMp";
import dataMp from "../data/multiplayerData.json";

const GameRoom = () => {
  const [data, setData] = useState(dataMp);
  const [searchData, setSearchData] = useState("");
  const [sortBySpeed, setSortBySpeed] = useState(false);
  const [sortByTime, setSortByTime] = useState(false);
  const [initialData, setInitialData] = useState(dataMp);

  const handleSearch = (e: any) => {
    setSearchData(e.target.value);
  };
  const filteredData = data.filter((room) =>
    room.name.toLowerCase().includes(searchData.toLowerCase())
  );

  useEffect(() => {
    setInitialData(dataMp);
    setData(dataMp);
  }, []);
  return (
    <motion.div
      className={"grow overflow-y-hidden flex flex-col px-5 py-3"}
      variants={pageVariants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      <input
        placeholder="Find a room"
        type="text"
        onChange={handleSearch}
        className="w-1/4 p-2 mx-auto mb-5 border-2 border-black rounded-2xl"
      />

      <div className="flex flex-row gap-10 w-full grow font-secondary min-h-0">
        <div className="w-3/4 h-full border-2 border-black flex flex-col rounded-2xl py-5 px-2">
          <div className="flex flex-row justify-around pb-2 text-xl font-bold">
            <span className="w-1/5 text-center">ID</span>
            <span className="w-2/5 text-center ">Name</span>
            <span className="w-1/5 text-center">Players</span>
            <span className="w-1/5 text-center ">Password</span>
            <span className="w-1/5 text-center">Lock</span>
          </div>
          <hr className="border-black" />
          <div
            className={
              "grow overflow-y-scroll scrollbar-thin scrollbar-thumb-[#339989] scrollbar-track-slate-100"
            }
          >
            <div className={"h-[3000px] flex flex-col gap-5"}>
              <hr className="border-black" />
              {filteredData.length ? (
                filteredData.map((room) => (
                  <RowMp key={room.id} dataMp={room} />
                ))
              ) : (
                <p className="mx-auto text-2xl">Rooms not found</p>
              )}
            </div>
          </div>
        </div>

        <div className="relative w-1/4 h-full border-2 border-black rounded-2xl py-5 px-2 font-primary flex flex-col gap-3 items-center">
          <span className="text-center text-3xl">Sort</span>
          <hr className="border-black w-full" />

          {/* <Checkbox
            value="by speed"
            id="speed"
            isChecked={}
            onChange={() => handleSort("speed")}
          />
          <Checkbox
            value="by time"
            id="time"
            isChecked={}
            onChange={() => handleSort("time")}
          /> */}
        </div>
      </div>
    </motion.div>
  );
};

export default GameRoom;
