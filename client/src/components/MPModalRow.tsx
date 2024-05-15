import { PiCrownSimpleDuotone } from "react-icons/pi";
import userIcon from "../assets/user_avatar.jpeg";

type TMPModalRowProps = {
  players: {
    id: number;
    isHost: boolean;
    img: string;
    name: string;
  };
};

const MPModalRow: React.FC<TMPModalRowProps> = ({ players }) => {
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
            <p className="text-lg">{players.name}</p>
            {players.isHost ? (
              <PiCrownSimpleDuotone className="text-yellow-600 text-lg" />
            ) : (
              <span> </span>
            )}
          </div>
        </div>
        {players.isHost ? (
          <span></span>
        ) : (
          <button className="uppercase bg-red-500 border-2 border-black p-1 rounded-lg text-white transition-all duration-200 hover:bg-red-700 active:scale-90">
            kick
          </button>
        )}
      </div>
    </>
  );
};

export default MPModalRow;
