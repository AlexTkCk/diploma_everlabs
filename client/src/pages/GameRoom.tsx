import React from 'react';
import {pageVariants} from "../styles/variants";
import {motion} from "framer-motion";

const GameRoom = () => {
    return (
        <motion.div className={'bg-red-500 text-white'}
                    variants={pageVariants}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}>
            GameRoom
        </motion.div>
    );
};

export default GameRoom;