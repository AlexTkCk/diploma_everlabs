import React, { useState, useEffect } from "react";
import { pageVariants } from "../styles/variants";
import { motion } from "framer-motion";

const GameRoom = () => {
  return (
    <motion.div
      className={"grow overflow-y-hidden flex flex-col"}
      variants={pageVariants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      Game Room
    </motion.div>
  );
};

export default GameRoom;
