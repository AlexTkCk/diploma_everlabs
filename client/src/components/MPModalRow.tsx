import { PiCrownSimpleDuotone } from "react-icons/pi";
import userIcon from "../assets/user_avatar.jpeg";
import {useContext, useEffect, useState} from "react";
import {serverUrl} from "../data/serverUrl";
import {userContext} from "../context/UserContext";

type TMPModalRowProps = {
  playerId: string,
  hostId: string,
  roomId: string,
};

const MPModalRow: React.FC<TMPModalRowProps> = ({ hostId, playerId, roomId }) => {

  const [userData, setUserData] = useState<{
    nickname: string,
    img_url: string,
  } | null>(null);

  const {userId} = useContext(userContext);

  useEffect(() => {
    fetch(serverUrl + `/user_info?id=${playerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'appication/json',
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json'
      },
    }).then(res => res.json()).then(data => {
      setUserData(data)
    })
  }, [])

  return (
    <>
      <div className="relative flex flex-row justify-between w-full items-center rounded-xl border-2 border-black p-2 font-primary">
        <div className="flex flex-row gap-5 items-center justify-center">
          <img
            className="h-10 aspect-square rounded-full border-2 border-black"
            src={userData?.img_url ? userData.img_url : userIcon}
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
        {
          userId.toString() === hostId.toString()
          &&
            <>
              {playerId === hostId ? (<></>) : <button onClick={() => {
                fetch(serverUrl + '/kick', {
                  method: 'PATCH',
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
            </>
        }
      </div>
    </>
  );
};

export default MPModalRow;
