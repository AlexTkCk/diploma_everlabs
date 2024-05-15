import React, { useState, useContext, useEffect } from "react";
import { pageVariants } from "../styles/variants";
import { motion } from "framer-motion";
import user_avatar from "../assets/user_avatar.jpeg";
import Button from "../components/Button";
import EditModal from "../components/EditModal";
import { themeContext } from "../context/ThemeContext";
import { userContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import { v4 as uuid4 } from "uuid";

const Account = () => {
  const { userData, setUserId, setUserData } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData]);

  const { themeConfig } = useContext(themeContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const [data, setData] = useState({
    name: "John Doe",
    numberOfRaces: "10",
    bestTime: "1:23:45",
    placeInRanking: "1",
    about:
      "Integer malesuada libero a pellentesque viverra. Phasellus ac orci eget dolor tempor facilisis. Proin rhoncus dapibus diam a maximus. Phasellus nulla diam, commodo nec finibus sed, elementum vitae quam. Curabitur non blandit massa. Pellentesque ac tristique justo.",
    startedPlaying: "02.05.2024",
    profileImg: user_avatar,
  });

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const handleShowCard = () => {
    setIsShow(!isShow);
  };

  const handleSave = (
    newName: string,
    newAbout: string,
    newProfileImg: File | null
  ) => {
    setData({
      ...data,
      name: newName,
      about: newAbout,
      profileImg: newProfileImg
        ? URL.createObjectURL(newProfileImg)
        : data.profileImg,
    });
    closeEditModal();
  };

  return (
    <motion.div
      className={
        "relative grow overflow-y-hidden flex flex-col items-center p-5 font-secondary"
      }
      variants={pageVariants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      <button
        className={
          "absolute top-2 right-2 border border-black px-4 py-2 text-2xl transition-all duration-300 hover:shadow-buttonHover_md hover:shadow-black hover:text-white"
        }
        onClick={() => {
          setUserId(uuid4());
          localStorage.removeItem("jwt");
          setUserData(null);
        }}
      >
        Log out
      </button>

      <div className="relative h-full w-3/4 flex flex-col gap-8 border-2 border-slate-900 p-8 pb-24 rounded-md shadow-xl bg-account bg-contain bg-repeat hover:">
        <h2 className="text-5xl">Driver Licence</h2>
        <div className="h-full flex flex-row gap-10">
          <img
            className="h-[80%] rounded-md border-2 border-slate-900"
            src={data.profileImg}
            alt="user_avatar"
          />
          {isShow ? (
            <>
              <div className="flex flex-col gap-5 font-primary text-xl">
                <p>
                  <span className="font-bold font-primary">Name:</span>
                  {userData?.name}
                </p>
                <p>
                  {" "}
                  <span className="font-bold">Number of races:</span>{" "}
                  {data.numberOfRaces}
                </p>
                <p>
                  <span className="font-bold">Best time in the race:</span>{" "}
                  {data.bestTime}
                </p>
                <p>
                  <span className="font-bold">Place in the ranking table:</span>{" "}
                  {data.placeInRanking}
                </p>
              </div>
              <p className="absolute bottom-3 right-3 text-center text-md font-bold ">
                Started playing: <br /> {data.startedPlaying}
              </p>
            </>
          ) : (
            <p className="text-xl text-justify w-2/4 scrollbar-thin scrollbar-thumb-[#339989] scrollbar-track-slate-300">
              <span className="font-bold">About me:</span> {data.about}
            </p>
          )}

          <Button
            buttonClassName={`absolute top-5 right-5 bg-slate-200 hover:shadow-buttonHover_md hover:shadow-blue-500 transition-all duration-500 hover:text-white ${themeConfig.accent} ${themeConfig.info}`}
            handler={openEditModal}
          >
            Edit
          </Button>
          <button
            className="absolute right-2 top-1/2 bg-green-500 text-white text-lg font-primary h-12 w-fit p-2 transition-all duration-300 hover:shadow-buttonHover_md hover:shadow-green-700"
            onClick={handleShowCard}
          >
            Show about
          </button>
        </div>
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        handler={closeEditModal}
        onSave={handleSave}
      />
    </motion.div>
  );
};

export default Account;
