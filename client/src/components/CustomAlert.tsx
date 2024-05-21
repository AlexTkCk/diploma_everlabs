import React, { useState } from "react";
import { MdOutlineInfo } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";

type AlertProps = {
  type: "success" | "error" | "info";
  text: string;
};

const CustomAlert: React.FC<AlertProps> = ({ type, text }) => {
  const [isOpen, setIsOpen] = useState(true);
  let selectedColor = "";
  let IconComponent = IoIosCloseCircleOutline;
  const handleClose = () => {
    setIsOpen(false);
  };

  switch (type) {
    case "success":
      selectedColor = "bg-green-200";
      IconComponent = IoCheckmarkCircleOutline;
      break;
    case "error":
      selectedColor = "bg-red-500";
      IconComponent = MdOutlineReportGmailerrorred;
      break;
    case "info":
      selectedColor = "bg-blue-200";
      IconComponent = MdOutlineInfo;
      break;
    default:
      selectedColor = "bg-gray-200";
      break;
  }

  return (
    <>
      {isOpen && (
        <motion.div
          whileTap={{
            opacity: 0,
            y: 20,
            transition: {
              duration: 0.2,
            },
          }}
          className={`absolute w-1/3 h-10 top-2 ${selectedColor} flex flex-row items-center px-5 gap-5 font-primary shadow-xl`}
        >
          {IconComponent && <IconComponent className="text-3xl" />}
          <p className="text-xl">{text}</p>
          <IoIosCloseCircleOutline
            className="absolute right-5 cursor-pointer text-3xl transition-all hover:scale-110 active:scale-90"
            onClick={handleClose}
          />
        </motion.div>
      )}
    </>
  );
};
export default CustomAlert;
