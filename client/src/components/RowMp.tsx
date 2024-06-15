import React, {ReactNode, useContext, useState} from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { FaLock } from "react-icons/fa6";
import { FaLockOpen } from "react-icons/fa6";
import {TRoom} from "../pages/MultiplayerRoom";
import {userContext} from "../context/UserContext";
import {serverUrl} from "../data/serverUrl";

type TRowMp = {
  dataMp: TRoom;
  children?: ReactNode | ReactNode[];
  handler: () => void;
  host_id: string;
  user_id: string;
};

const RowMp: React.FC<TRowMp> = ({
  dataMp,
  children,
  handler,
}) => {

  const {userId} = useContext(userContext);
  const isHost = dataMp.host_id.toString() === userId.toString();
  const handleRowClick = () => {
    if (handler) {
      handler();
    }
  };
  return (
    <div
      className={`${isHost ? 'shadow-sm shadow-black' : ''} ${dataMp.game_lock_status ? (isHost ? '' : 'opacity-50 pointer-events-none') : ''} flex flex-row justify-around text-center ml-2 text-xl transition-all items-center h-10  active:bg-gray-200 cursor-pointer`}
      onClick={handleRowClick}
    >
      <span className="w-1/5 ">{dataMp.id}</span>
      <span className="w-2/5">{dataMp.name}</span>
      <span className="w-1/5">
        {dataMp.players_count} / 2
      </span>
      <span className="w-1/5">
        {dataMp.password_status ? (
          <ImCheckboxChecked className="mx-auto text-3xl h-full" />
        ) : null}
      </span>
      <span className={`w-1/5 ${isHost ? '' : 'pointer-events-none'}`}>
        {dataMp.game_lock_status ? (
          <FaLock onClick={(e) => {
            e.stopPropagation();
            fetch(serverUrl + '/lock_unlock', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                'Accept': 'application/json'
              },
              body: JSON.stringify({room_id: dataMp.id})
            })
          }} className="text-3xl mx-auto h-full" />
        ) : (
          <FaLockOpen onClick={(e) => {
            e.stopPropagation();
            fetch(serverUrl + '/lock_unlock', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                'Accept': 'application/json'
              },
              body: JSON.stringify({room_id: dataMp.id})
            })
          }} className="text-3xl mx-auto h-full" />
        )}
      </span>
    </div>
  );
};

export default RowMp;
