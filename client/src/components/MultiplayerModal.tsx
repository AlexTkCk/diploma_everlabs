import {useState, useEffect, useContext} from "react";
import {FaRegWindowClose} from "react-icons/fa";
import MPModalRow from "./MPModalRow";
import {serverUrl} from "../data/serverUrl";
import {userContext} from "../context/UserContext";
import {useNavigate} from "react-router";
import Button from "./Button";

type TMPModal = {
    handleCloseModal: () => void;
    room: any
};

const MultiplayerModal: React.FC<TMPModal> = ({room, handleCloseModal}) => {
    const {userId} = useContext(userContext);
    const navigate = useNavigate();
    const [showPasswordPopUp, setShowPasswordPopUp] = useState(false);
    const [password, setPassword] = useState('');

    const [currentUserRooms, setCurrentUserRooms] = useState<any[] | null>(null);

    useEffect(() => {
        fetch(serverUrl + `/user_info?id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                'Accept': 'application/json'
            },
        }).then(res => res.json()).then(data => setCurrentUserRooms(data.matches))
    }, [])

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
                        onClick={handleCloseModal}
                    />

                    <h3 className="font-bold text-2xl">{room.name}</h3>
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row gap-2">
                            {room.game_lock_status ? (
                                <p className="font-bold">Locked</p>
                            ) : (
                                <p className="font-bold">Not Locked</p>
                            )}
                        </div>

                        <p className="text-xl font-bold">
                            Players: {room.players_count}/
                            2
                        </p>
                    </div>

                    <div className="h-fit w-full flex flex-col gap-2">
                        {room.host_id !== '0' &&
                            <MPModalRow hostId={room.host_id} roomId={room.id} playerId={room.host_id}/>}
                        {room.user_id !== '0' &&
                            <MPModalRow hostId={room.host_id} roomId={room.id} playerId={room.user_id}/>}
                    </div>

                    {
                        room.host_id.toString() !== userId.toString()
                        &&
                        room.user_id.toString() !== userId.toString()
                            ?
                            <button onClick={() => {

                                if (room.password_status && userId.toString() !== room.host_id) {
                                    setShowPasswordPopUp(true);
                                    return;
                                }

                                if (room.players_count === 2) {
                                    alert('Room is full');
                                    return;
                                }

                                if (currentUserRooms && currentUserRooms.length > 0)
                                    fetch(serverUrl + '/leave', {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'ngrok-skip-browser-warning': 'true',
                                            'Accept': 'application/json',
                                        },
                                        body: JSON.stringify({id: userId})
                                    })

                                fetch(serverUrl + '/enter_room', {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'ngrok-skip-browser-warning': 'true',
                                        'Accept': 'application/json',
                                    },
                                    body: JSON.stringify({id: userId, room_id: room.id})
                                })
                            }}
                                    className="w-1/3 h-12 bg-green-500 text-white text-2xl font-primary font-bold transition-all duration-300 xl:hover:shadow-buttonHover_lg xl:hover:shadow-green-700">
                                Join
                            </button>
                            :
                            <button onClick={() => {
                                if (userId.toString() === room.user_id || userId.toString() === room.host_id) {
                                    navigate('/gameRoom/' + room.id);
                                }
                            }}
                                    className="w-1/3 h-12 bg-green-500 text-white text-2xl font-primary font-bold transition-all duration-300 xl:hover:shadow-buttonHover_lg xl:hover:shadow-green-700">
                                Play
                            </button>
                    }


                </div>

                {showPasswordPopUp
                    &&
                    <div
                        className={'absolute bg-white border-4 z-10 border-black p-5 flex flex-col gap-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}>
                        <h1 className={'font-primary text-2xl'}>Enter password to enter:</h1>
                        <input type="text" onChange={({currentTarget: {value}}) => {
                            setPassword(value)
                        }} className={'border border-black rounded-lg text-xl p-2'}/>
                        <div className={'flex w-full justify-evenly gap-2'}>
                            <Button handler={() => {

                                fetch(serverUrl + '/enter_pass', {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'ngrok-skip-browser-warning': 'true',
                                        'Accept': 'application/json',
                                    },
                                    body: JSON.stringify({id: userId, room_id: room.id, password: password})
                                }).then(res => res.json()).then(data => {
                                        if (data.status === '3') {
                                            if (userId.toString() === room.user_id || userId.toString() === room.host_id) {
                                                navigate('/gameRoom/' + room.id);
                                            } else {
                                                if (currentUserRooms && currentUserRooms.length > 0)
                                                    fetch(serverUrl + '/leave', {
                                                        method: 'PATCH',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'ngrok-skip-browser-warning': 'true',
                                                            'Accept': 'application/json',
                                                        },
                                                        body: JSON.stringify({id: userId})
                                                    })

                                                fetch(serverUrl + '/enter_room', {
                                                    method: 'PATCH',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'ngrok-skip-browser-warning': 'true',
                                                        'Accept': 'application/json',
                                                    },
                                                    body: JSON.stringify({id: userId, room_id: room.id})
                                                }).then(res => res.json()).then(data => {
                                                    navigate('/gameRoom/' + room.id);
                                                })
                                            }
                                        } else {
                                            alert('Wrong password');
                                        }
                                    }
                                )
                            }} buttonClassName={'text-green-500 border-green-500 font-secondary'}>Accept</Button>
                            <Button handler={() => {
                                setShowPasswordPopUp(false);
                                setPassword('');
                            }} buttonClassName={'text-red-500 border-red-500 font-secondary'}>Decline</Button>
                        </div>
                    </div>
                }

            </div>
        </>
    );
};

export default MultiplayerModal;
