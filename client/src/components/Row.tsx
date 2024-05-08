import React from "react";

type TRow = {
  dataLB: {
    id: number;
    name: string;
    speed: number;
    time: number;
  };
};

const Row: React.FC<TRow> = ({ dataLB }) => {
  return (
    <div className="flex flex-row justify-around text-center">
      <span className="w-1/3">{dataLB.name}</span>
      <span className="w-1/3">{dataLB.speed}</span>
      <span className="w-1/3">{dataLB.time}</span>
    </div>
  );
};

export default Row;
