import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { IconType } from "react-icons";

interface CustomLinkProps {
  icon?: IconType;
  text: string;
  link: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ icon: Icon, text, link }) => {
  return (
    <RouterLink
      to={link}
      className="relative flex flex-row gap-3 h-16 w-fit text-black ml-20 group"
    >
      {Icon && (
        <Icon className="absolute h-16 w-16 top-1/2 left-1/2 p-2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan  border-black border-2 rounded-full z-[1] group-hover:rotate-[360deg] group-hover:left-[-0.7rem] transition-all easy-in-out duration-500" />
      )}
      <p className="absolute font-primary text-xl top-1/2 left-1/2 opacity-0 transform  -translate-y-1/2 border-2 border-black p-2 pl-4 z-[-1] group-hover:translate-x-2 group-hover:opacity-100 transition-all duration-200 delay-200 easy-in-out">
        {text}
      </p>
    </RouterLink>
  );
};

export default CustomLink;
