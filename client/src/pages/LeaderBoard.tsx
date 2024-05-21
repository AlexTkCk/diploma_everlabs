import React, { useState, useEffect } from "react";
import { pageVariants } from "../styles/variants";
import { motion } from "framer-motion";
import RowLb from "../components/RowLb";
import Checkbox from "../components/CheckBox";
import dataLB from "../data/leaderboardData.json";
import {serverUrl} from "../data/serverUrl";

type TData = {
  id: number;
  nickname: string;
  accuracy: number;
  sps: number;
};

const LeaderBoard = () => {
  const [data, setData] = useState<TData[]>([]);
  const [searchData, setSearchData] = useState("");
  const [sortByAccuracy, setSortByAccuracy] = useState(false);
  const [sortBySps, setSortBySps] = useState(false);

  const handleSearch = (e: any) => {
    setSearchData(e.target.value);
  };

  useEffect(() => {
    fetch(serverUrl + '/leaderboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
      }
    }).then(res => res.json()).then(data => {
      setData(data)
    })
  }, [])

  const filteredData = data.filter((player) =>
    {
      return player.nickname.toLowerCase().includes(searchData.toLowerCase())
    }
  );

  const handleSort = (sortBy: string) => {
    let newData = [...data];

    if (sortBy === "accuracy") {
      newData = sortByAccuracy
        ? newData.sort((a, b) => a.accuracy - b.accuracy)
        : newData.sort((a, b) => b.accuracy - a.accuracy);
      setSortByAccuracy(!sortByAccuracy);
      setSortBySps(false);
    } else if (sortBy === "sps") {
      newData = sortBySps
        ? newData.sort((a, b) => a.sps - b.sps)
        : newData.sort((a, b) => b.sps - a.sps);
      setSortBySps(!sortBySps);
      setSortByAccuracy(false);
    }
    setData(newData);
  };


  return (
    <motion.div
      className={"growLb overflow-y-hidden h-full flex flex-col px-5 py-3"}
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
          <div className="flex flex-rowLb justify-around pb-2 text-xl font-bold">
            <span className="w-1/3 text-center">Name</span>
            <span className="w-1/3 text-center">Accuracy</span>
            <span className="w-1/3 text-center">SpS</span>
          </div>
          <hr className="border-black" />
          <div
            className={
              "grow overflow-y-scroll scrollbar-thin scrollbar-thumb-[#339989] scrollbar-track-slate-100"
            }
          >
            <div className={"h-auto flex flex-col gap-5"}>
              <hr className="border-black" />
              {filteredData.length ? (
                filteredData.map((player) => (
                  <motion.div
                    key={player.id}
                    layout
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <RowLb dataLB={player} />
                  </motion.div>
                ))
              ) : (
                <p className="mx-auto text-2xl">User not found</p>
              )}
            </div>
          </div>
        </div>

        <div className="relative w-1/4 h-full border-2 border-black rounded-2xl py-5 px-2 font-primary flex flex-col gap-3 items-center">
          <span className="text-center text-3xl">Sort</span>
          <hr className="border-black w-full" />

          <Checkbox
            value="by accuracy"
            id="speed"
            isChecked={sortByAccuracy}
            onChange={() => handleSort("accuracy")}
          />
          <Checkbox
            value="by sps"
            id="time"
            isChecked={sortBySps}
            onChange={() => handleSort("sps")}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LeaderBoard;
