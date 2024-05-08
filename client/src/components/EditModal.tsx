import React, { useContext, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { themeContext } from "../context/ThemeContext";

type TEditModal = {
  isOpen: boolean;
  handler: () => void;
  onSave: (
    newName: string,
    newAbout: string,
    newProfileImg: File | null
  ) => void;
};

const EditModal: React.FC<TEditModal> = ({ isOpen, handler, onSave }) => {
  const { themeConfig } = useContext(themeContext);
  const [newName, setNewName] = useState("");
  const [newAbout, setNewAbout] = useState("");
  const [newProfileImg, setNewProfileimg] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(newName, newAbout, newProfileImg);
    handler();
  };

  return (
    <div className={"fixed top-0 left-0 w-full h-full grid place-items-center"}>
      <div
        className={"absolute top-0 left-0 w-full h-full bg-black opacity-80"}
        onClick={handler}
      ></div>
      <div
        className={`w-fit -skew-x-12 ${themeConfig.neon} ${themeConfig.info} py-5 border-2 px-5`}
      >
        <div className={"mx-auto flex flex-col gap-10"}>
          <Input
            placeholder={"Racer"}
            changeHandler={(e) => setNewName(e.target.value)}
            labelText={'Edit "Name"'}
          />
          <Input
            placeholder={"Write something.."}
            changeHandler={(e) => setNewAbout(e.target.value)}
            labelText={'Edit "About me"'}
          />
          <div>
            <label
              htmlFor="file"
              className={`${themeConfig.secondary} border-2 ${themeConfig.neon} flex items-center text-white text-xl font-primary h-10 w-fit p-4 mx-auto cursor-pointer`}
            >
              Choose file
            </label>
            <input
              className="hidden"
              type="file"
              id="file"
              onChange={(e) => setNewProfileimg(e.target.files?.[0] || null)}
            />
          </div>

          <Button
            handler={handleSave}
            buttonClassName={`w-fit mx-auto hover:shadow-buttonHover hover:shadow-blue-500 transition-all duration-500 hover:text-white ${themeConfig.accent} ${themeConfig.info}`}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
