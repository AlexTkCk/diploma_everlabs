import React, {ReactNode, useContext} from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { FaLock } from "react-icons/fa6";
import { FaLockOpen } from "react-icons/fa6";
import {TRoom} from "../pages/MultiplayerRoom";
import {userContext} from "../context/UserContext";
import {serverUrl} from "../data/serverUrl";

type TRowMp = {
  dataMp: TRoom;
  children?: ReactNode | ReactNode[];
  setActiveRoom: (roomId: number) => void;
  handler: () => void;
};

const RowMp: React.FC<TRowMp> = ({
  dataMp,
  children,
  setActiveRoom,
  handler,
}) => {

  const {userId} = useContext(userContext);

  const handleRowClick = () => {
    if (handler) {
      handler();
    }

    fetch(serverUrl + '/enter_room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
      },
      body: JSON.stringify({id: userId, room_id: dataMp.id})
    }).then(res => res.json()).then(data => {
      console.log(data)
    })
  };

  return (
    <div
      className="flex flex-row justify-around text-center ml-2 text-xl transition-all items-center h-10  active:bg-gray-200 cursor-pointer"
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
      <span className="w-1/5 ">
        {dataMp.password_status ? (
          <FaLock className="text-3xl mx-auto h-full" />
        ) : (
          <FaLockOpen className="text-3xl mx-auto h-full" />
        )}
      </span>
    </div>
  );
};

export default RowMp;
