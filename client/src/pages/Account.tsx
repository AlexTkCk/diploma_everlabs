import React, { useState, useContext } from "react";
import { pageVariants } from "../styles/variants";
import { motion } from "framer-motion";
import user_avatar from "../assets/user_avatar.jpeg";
import Button from "../components/Button";
import EditModal from "../components/EditModal";
import { themeContext } from "../context/ThemeContext";

const Account = () => {
  const { themeConfig } = useContext(themeContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
        "grow overflow-y-hidden flex flex-col items-center p-5 font-secondary"
      }
      variants={pageVariants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      <div className="relative h-full w-3/4 flex flex-col gap-8 border-2 border-slate-900 p-8 pb-24 rounded-md shadow-xl bg-account bg-contain bg-repeat">
        <h2 className="text-5xl">Driver Licence</h2>
        <div className="h-full flex flex-row gap-10">
          <img
            className="h-[80%] rounded-md border-2 border-slate-900"
            src={data.profileImg}
            alt="user_avatar"
          />
          <div className="flex flex-col gap-5 font-primary text-xl">
            <p>
              <span className="font-bold">Name:</span>
              {data.name}
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
            <p className="text-justify w-3/4 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#339989] scrollbar-track-slate-300">
              <span className="font-bold">About me:</span> {data.about}
            </p>
          </div>
          <p className="absolute bottom-3 right-3 text-center text-md font-bold ">
            Started playing: <br /> {data.startedPlaying}
          </p>
          <Button
            buttonClassName={`absolute top-5 right-5 bg-slate-200 hover:shadow-buttonHover hover:shadow-blue-500 transition-all duration-500 hover:text-white ${themeConfig.accent} ${themeConfig.info}`}
            handler={openEditModal}
          >
            Edit
          </Button>
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
