import React, { ReactNode } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { FaLock } from "react-icons/fa6";
import { FaLockOpen } from "react-icons/fa6";
type TRowMp = {
  dataMp: {
    id: number;
    name: string;
    players: {
      amount: number;
      totalAmount: number;
    };
    password: boolean;
  };
  children?: ReactNode | ReactNode[];
};

const RowMp: React.FC<TRowMp> = ({ dataMp, children }) => {
  return (
    <button className="flex flex-row justify-around text-center ml-2 text-xl transition-all items-center h-10  active:bg-gray-500">
      <span className="w-1/5 ">{dataMp.id}</span>
      <span className="w-2/5">{dataMp.name}</span>
      <span className="w-1/5">
        {dataMp.players.amount} / {dataMp.players.totalAmount}
      </span>
      <span className="w-1/5">
        {dataMp.password ? (
          <ImCheckboxChecked className="mx-auto text-3xl h-full" />
        ) : null}
      </span>
      <span className="w-1/5 ">
        {dataMp.password ? (
          <FaLock className="text-3xl mx-auto h-full" />
        ) : (
          <FaLockOpen className="text-3xl mx-auto h-full" />
        )}
      </span>
    </button>
  );
};

export default RowMp;
