import React, {useState, useEffect, useContext} from "react";
import {pageVariants} from "../styles/variants";
import {motion} from "framer-motion";
import Checkbox from "../components/CheckBox";
import RowMp from "../components/RowMp";
import MPModal from "../components/MultiplayerModal";
import {serverUrl} from "../data/serverUrl";
import Button from "../components/Button";
import {userContext} from "../context/UserContext";
import {consumer} from "../actioncabe";
import {Channel} from "@rails/actioncable";

export type TRoom = {
    id: string,
    name: string,
    players_count: number,
    host_id: string,
    user_id: string,
    password_status: boolean,
    game_lock_status: boolean,
}

const MultiplayerRoom = () => {
    const [data, setData] = useState<TRoom[]>([]);
    const [searchData, setSearchData] = useState("");
    const [sortByPassword, setSortByPassword] = useState(false);
    const [sortByFullRoom, setSortByFullRoom] = useState(false);
    const [sortByLock, setSortByLock] = useState(false);

    const [activeRoom, setActiveRoom] = useState<TRoom | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
    const [newRoomPassword, setNewRoomPassword] = useState('');

    const [ws, setWs] = useState<Channel | null>(null);

    const {userId} = useContext(userContext);

    useEffect(() => {
        fetch(serverUrl + '/get_info_rooms', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                'Accept': 'application/json',
            },
        }).then(res => res.json()).then(data => {
            setData(data)
        })

        const subscription = consumer.subscriptions.create(
            { channel: "RoomsChannel"},
            {
                received(data: any) {
                    if (data.message) {
                        fetch(serverUrl + '/get_info_rooms', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'ngrok-skip-browser-warning': 'true',
                                'Accept': 'application/json',
                            },
                        }).then(res => res.json()).then(data => {
                            setData(data);
                            setActiveRoom(prev => data.find((room: TRoom) => room.id === prev?.id))
                        })
                    }
                }
            }
        );
        setWs(subscription);
        return () => {
            subscription.unsubscribe();
        };

    }, []);

    const handleSort = (sortBy: string) => {
        let newData = [...data];

        if (sortBy === "password") {
            newData = sortByPassword
                ? newData.sort((a) => (a.password_status ? 1 : -1))
                : newData.sort((a) => (a.password_status ? -1 : 1));
            setSortByPassword(!sortByPassword);
            setSortByFullRoom(false);
            setSortByLock(false);
        } else if (sortBy === "fullRoom") {
            newData = sortByFullRoom
                ? newData.sort((a, b) => a.players_count - b.players_count)
                : newData.sort((a, b) => b.players_count - a.players_count);
            setSortByFullRoom(!sortByFullRoom);
            setSortByPassword(false);
            setSortByLock(false);
        } else if (sortBy === "lock") {
            newData = sortByLock
                ? newData.sort((a) => (a.password_status ? 1 : -1))
                : newData.sort((a) => (a.password_status ? -1 : 1));
            setSortByLock(!sortByLock);
            setSortByPassword(false);
            setSortByFullRoom(false);
        }
        setData(newData);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handleSetActiveRoom = (roomId: any) => {
        const room = data.find(room => room.id === roomId);
        if (room)
            setActiveRoom(room);
        else
            setActiveRoom(null);
    };
    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };
    const filteredData = data.filter((room) =>
        room.name.toLowerCase().includes(searchData.toLowerCase())
    );


    return (
        <motion.div
            className={"grow overflow-y-hidden flex flex-col px-5 py-3"}
            variants={pageVariants}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
        >
            <div className={'flex'}>
                <input
                    placeholder="Find a room"
                    type="text"
                    onChange={handleSearch}
                    className="w-1/4 p-2 h-fit my-auto mx-auto mb-5 border-2 border-black rounded-2xl"
                />
                <Button handler={() => {
                    setShowCreateRoomModal(true);
                }} buttonClassName={'my-3'}>Create room</Button>
            </div>

            <div className="flex flex-row gap-10 w-full grow font-secondary min-h-0">
                <div className="w-3/4 h-full border-2 border-black flex flex-col rounded-2xl py-5 px-2">
                    <div className="flex flex-row justify-around pb-2 text-xl font-bold">
                        <span className="w-1/5 text-center">ID</span>
                        <span className="w-2/5 text-center ">Name</span>
                        <span className="w-1/5 text-center">Players</span>
                        <span className="w-1/5 text-center ">Password</span>
                        <span className="w-1/5 text-center">Lock</span>
                    </div>
                    <hr className="border-black"/>
                    <div
                        className={
                            "grow overflow-y-scroll scrollbar-thin scrollbar-thumb-[#339989] scrollbar-track-slate-100"
                        }
                    >
                        <div className={"h-auto flex flex-col gap-5"}>
                            <hr className="border-black"/>
                            {filteredData.length ? (
                                filteredData.map((room) => (
                                    <motion.div
                                        key={room.id}
                                        layout
                                        transition={{type: "spring", damping: 25, stiffness: 120}}
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                    >
                                        <RowMp
                                            host_id={room.host_id}
                                            user_id={room.user_id}
                                            dataMp={room}
                                            handler={() => {
                                                handleModalOpen();
                                                handleSetActiveRoom(room.id)
                                            }}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <p className="mx-auto text-2xl">Rooms not found</p>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className="relative w-1/4 h-full border-2 border-black rounded-2xl py-5 px-2 font-primary flex flex-col gap-3 items-center">
                    <span className="text-center text-3xl">Sort</span>
                    <hr className="border-black w-full"/>

                    <Checkbox
                        value="Password"
                        id="pw"
                        isChecked={sortByPassword}
                        onChange={() => handleSort("password")}
                    />
                    <Checkbox
                        value="Full room"
                        id="fr"
                        isChecked={sortByFullRoom}
                        onChange={() => handleSort("fullRoom")}
                    />
                    <Checkbox
                        value="Lock"
                        id="lock"
                        isChecked={sortByLock}
                        onChange={() => handleSort("lock")}
                    />
                </div>
            </div>
            {isModalOpen && <MPModal room={activeRoom} handleCloseModal={handleModalClose}/>}
            {showCreateRoomModal
                &&
                <div
                    className={'absolute top-1/2 left-1/2 p-5 -translate-x-1/2 -translate-y-1/2 border-4 border-black rounded-xl bg-white'}>
                    <h1 className={'font-primary text-2xl'}>Set room settings</h1>
                    <div className={'w-full flex flex-col gap-2 my-5'}>
                        <h2 className={'font-primary text-xl'}>Add password or leave empty</h2>
                        <input type="text" onChange={({currentTarget: {value}}) => {setNewRoomPassword(value)}} className={'border border-black rounded-lg text-xl p-2'}/>
                    </div>
                    <div className={'w-full flex gap-2'}>
                        <Button handler={() => {
                            fetch(serverUrl + '/enter_own_room', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'ngrok-skip-browser-warning': 'true',
                                    'Accept': 'application/json',
                                },
                                body: JSON.stringify({id: userId})
                            })

                            if (newRoomPassword !== '') {
                                fetch(serverUrl + '/password_enable', {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'ngrok-skip-browser-warning': 'true',
                                        'Accept': 'application/json',
                                    },
                                    body: JSON.stringify({room_id: userId, password: newRoomPassword})
                                })
                            }

                            fetch(serverUrl + '/get_info_rooms', {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'ngrok-skip-browser-warning': 'true',
                                    'Accept': 'application/json',
                                },
                            }).then(res => res.json()).then(data => {
                                setData(data)
                            })
                            setShowCreateRoomModal(false);
                        }} buttonClassName={'text-green-500 border-green-500 font-secondary'}>Accept</Button>
                        <Button handler={() => {
                            setShowCreateRoomModal(false);
                            setNewRoomPassword('');
                        }} buttonClassName={'text-red-500 border-red-500 font-secondary'}>Decline</Button>
                    </div>
                </div>
            }

        </motion.div>
    );
};

export default MultiplayerRoom;
