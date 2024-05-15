import { useState, useEffect } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import hostImg from "../assets/user_avatar.jpeg";
import MPRoomData from "../data/MPRoomData.json";
import MPModalRow from "./MPModalRow";

const MultiplayerModal = () => {
  const [roomData, setRoomData] = useState(MPRoomData);
  const [playersData, setPlayersData] = useState(MPRoomData.players);

  useEffect(() => {
    setPlayersData(MPRoomData.players);
    setRoomData(MPRoomData);
  }, []);

  return (
    <>
      <div
        className={"fixed top-0 left-0 w-full h-full grid place-items-center"}
      >
        <div
          className={"absolute top-0 left-0 w-full h-full bg-black opacity-80"}
        ></div>
        <div
          className={`relative w-1/3 h-fit flex flex-col items-center -skew-x-12 p-5 border-2 text-black bg-slate-100
          gap-5`}
        >
          <FaRegWindowClose
            className="absolute top-2 right-2 text-4xl cursor-pointer box-content transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => {}}
          />

          <img
            className="w-32 rounded-full border-2 border-black bg-center"
            src={playersData[0].isHost ? hostImg : playersData[0].img}
            alt="host_img"
          />

          <h3 className="font-bold text-2xl">{roomData.roomName}</h3>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row gap-2">
              {roomData.isLocked ? (
                <p className="font-bold">Locked</p>
              ) : (
                <p className="font-bold">Not Locked</p>
              )}
              {roomData.password.length > 0 ? (
                <p className="font-bold">
                  Password:{" "}
                  <span className="font-normal">{roomData.password}</span>
                </p>
              ) : (
                <p>No password</p>
              )}
            </div>

            <p className="text-xl font-bold">
              Players: {roomData.playerCount.connectedPlayers}/
              {roomData.playerCount.totalPlayersAllowed}
            </p>
          </div>

          <div className="h-fit w-full flex flex-col gap-2">
            {playersData.map((player) => (
              <MPModalRow key={player.id} players={player} />
            ))}
          </div>

          <button className="w-1/3 h-12 bg-green-500 text-white text-2xl font-primary font-bold transition-all duration-300 xl:hover:shadow-buttonHover_lg xl:hover:shadow-green-700">
            Play
          </button>
        </div>
      </div>
    </>
  );
};

export default MultiplayerModal;
