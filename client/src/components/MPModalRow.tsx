import { PiCrownSimpleDuotone } from "react-icons/pi";
import userIcon from "../assets/user_avatar.jpeg";
import {useEffect, useState} from "react";
import {serverUrl} from "../data/serverUrl";

type TMPModalRowProps = {
  playerId: string,
  hostId: string,
  roomId: string,
};

const MPModalRow: React.FC<TMPModalRowProps> = ({ hostId, playerId, roomId }) => {

  const [userData, setUserData] = useState<{
    nickname: string,
    img_url: string,
    matches: any[]
  } | null>(null);

  useEffect(() => {
    fetch(serverUrl + '/user_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'appication/json',
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json'
      },
      body: JSON.stringify({id: playerId})
    }).then(res => res.json()).then(data => setUserData(data))
  }, [])

  return (
    <>
      <div className="relative flex flex-row justify-between w-full items-center rounded-xl border-2 border-black p-2 font-primary">
        <div className="flex flex-row gap-5 items-center justify-center">
          <img
            className="h-10 rounded-full border-2 border-black"
            // src={players.img ? players.img : userIcon}
            src={userIcon}
            alt="player_icon"
          />
          <div className="flex flex-row gap-1 items-center">
            <p className="text-lg">{userData?.nickname ? userData.nickname : ''}</p>
            {playerId === hostId ? (
              <PiCrownSimpleDuotone className="text-yellow-600 text-lg" />
            ) : (
              <span> </span>
            )}
          </div>
        </div>
        {playerId === hostId ? (
            <></>
        ) : <button onClick={() => {
          fetch(serverUrl + '/kick', {
            method: 'POST',
            headers: {
              'Content-Type': 'appication/json',
              'ngrok-skip-browser-warning': 'true',
              'Accept': 'application/json'
            },
            body: JSON.stringify({room_id: roomId})
          }).then(res => res.json()).then(data => setUserData(data))
        }} className="uppercase bg-red-500 border-2 border-black p-1 rounded-lg text-white transition-all duration-200 hover:bg-red-700 active:scale-90">
          kick
        </button>}
      </div>
    </>
  );
};

export default MPModalRow;
