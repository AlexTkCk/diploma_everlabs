import React from "react";

type TRowLb = {
  dataLB: {
    id: number;
    nickname: string;
    accuracy: number;
    sps: number;
  };
};

const RowLb: React.FC<TRowLb> = ({ dataLB }) => {
  return (
    <div className="flex flex-row justify-around text-center text-xl h-10">
      <span className="w-1/3">{dataLB.nickname}</span>
      <span className="w-1/3">{dataLB.accuracy}</span>
      <span className="w-1/3">{dataLB.sps}</span>
    </div>
  );
};

export default RowLb;
