import React from "react";

type TRowLb = {
  dataLB: {
    id: number;
    name: string;
    speed: number;
    time: number;
  };
};

const RowLb: React.FC<TRowLb> = ({ dataLB }) => {
  return (
    <div className="flex flex-row justify-around text-center text-xl h-10">
      <span className="w-1/3">{dataLB.name}</span>
      <span className="w-1/3">{dataLB.speed}</span>
      <span className="w-1/3">{dataLB.time}</span>
    </div>
  );
};

export default RowLb;
