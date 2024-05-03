import React from "react";

type TRow = {
  name: string;
  speed: string;
  time: string;
};

const Row: React.FC<TRow> = ({ name, speed, time }) => {
  return (
    <div className="flex flex-row justify-around text-center">
      <span className="w-1/3">{name}</span>
      <span className="w-1/3">{speed}</span>
      <span className="w-1/3">{time}</span>
    </div>
  );
};

export default Row;
