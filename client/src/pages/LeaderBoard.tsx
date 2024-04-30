import React from 'react';
import {pageVariants} from "../styles/variants";
import {motion} from "framer-motion";

const LeaderBoard = () => {
    return (
        <motion.div className={'bg-red-500 text-white'}
                    variants={pageVariants}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}>
            LeaderBoard
        </motion.div>
    );
};

export default LeaderBoard;