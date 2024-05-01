import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { IconType } from "react-icons";

interface CustomLinkProps {
  icon: IconType;
  text: string;
  link: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ icon: Icon, text, link }) => {
  return (
    <RouterLink
      to={link}
      className="flex flex-row items-center justify-center w-16 hover:w-fit duration-500 h-16 text-black group"
    >
      <Icon className="h-16 shrink-0 w-16 top-1/2 left-1/2 p-2 bg-cyan  border-black border-2 rounded-full z-[1] group-hover:rotate-[360deg] group-hover:left-[-0.7rem] transition-all easy-in-out duration-500" />
      <p className="font-primary text-xl border-0 opacity-0 text-nowrap border-black -translate-x-5 group-hover:-translate-x-2.5 group-hover:pl-4 group-hover:opacity-100 group-hover:w-full transition-all group-hover:border-2 group-hover:p-2 duration-500 overflow-hidden">
        {text}
      </p>
    </RouterLink>
  );
};

export default CustomLink;
