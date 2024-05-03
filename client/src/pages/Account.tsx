import React from "react";
import { pageVariants } from "../styles/variants";
import { motion } from "framer-motion";
import user_avatar from "../assets/user_avatar.jpeg";
import Button from "../components/Button";

const Account = () => {
  const data = {
    name: "John Doe",
    numberOfRaces: "10",
    bestTime: "1:23:45",
    placeInRanking: "1",
    about:
      "Integer malesuada libero a pellentesque viverra. Phasellus ac orci eget dolor tempor facilisis. Proin rhoncus dapibus diam a maximus. Phasellus nulla diam, commodo nec finibus sed, elementum vitae quam. Curabitur non blandit massa. Pellentesque ac tristique justo.",
    startedPlaying: "02.05.2024",
  };
  return (
    <motion.div
      className={
        "grow overflow-y-hidden flex flex-col items-center p-5 font-secondary"
      }
      variants={pageVariants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      <div className="relative h-full w-3/4 flex flex-col gap-10 border-2 border-slate-900 p-10 pb-24 rounded-md shadow-xl bg-account bg-contain bg-repeat">
        <h2 className="text-5xl">Driver Licence</h2>
        <div className="h-full flex flex-row gap-10">
          <img
            className="h-[80%] rounded-md border-2 border-slate-900"
            src={user_avatar}
            alt="user_avatar"
          />
          <div className="flex flex-col gap-5 font-primary text-xl">
            <p>
              <span className="font-bold">Name:</span>
              {data.name}
            </p>
            <p>
              {" "}
              <span className="font-bold">Number of races:</span>{" "}
              {data.numberOfRaces}
            </p>
            <p>
              <span className="font-bold">Best time in the race:</span>{" "}
              {data.bestTime}
            </p>
            <p>
              <span className="font-bold">Place in the ranking table:</span>{" "}
              {data.placeInRanking}
            </p>
            <p className="text-justify w-3/4 overflow-y-scroll">
              <span className="font-bold">About me:</span> {data.about}
            </p>
          </div>
          <p className="absolute bottom-3 right-3 text-center text-md font-bold">
            Started playing: <br /> {data.startedPlaying}
          </p>
          <Button
            buttonClassName="absolute top-5 right-5 bg-slate-200"
            handler={() => {}}
          >
            Edit
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Account;
