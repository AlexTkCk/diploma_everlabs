import React, {useContext} from "react";
import { Link as RouterLink } from "react-router-dom";
import { IconType } from "react-icons";
import {themeContext} from "../context/ThemeContext";

interface CustomLinkProps {
  icon: IconType;
  text: string;
  link: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ icon: Icon, text, link }) => {

  const {themeConfig} = useContext(themeContext);
  return (
    <RouterLink
      to={link}
      className="flex flex-row-reverse items-center justify-center w-16 hover:w-fit duration-500 h-16 text-black group"
    >
      <p className={`font-primary text-xl border-0 opacity-0 text-nowrap border-black -translate-x-5 group-hover:-translate-x-2.5 group-hover:pl-4 group-hover:opacity-100 group-hover:w-full transition-all group-hover:border-2 group-hover:p-2 duration-500 overflow-hidden ${themeConfig.accent}`}>
        {text}
      </p>
      <Icon className={`h-16 shrink-0 w-16 top-1/2 left-1/2 p-2 ${themeConfig.accent} border-black border-2 rounded-full group-hover:rotate-[360deg] group-hover:left-[-0.7rem] transition duration-500`} />
    </RouterLink>
  );
};

export default CustomLink;
