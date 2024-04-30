import {motion} from 'framer-motion';
import React from 'react';
import {pageVariants} from "../styles/variants";

const Home = () => {
    return (
        <motion.div className={'bg-red-500 text-white'}
                    variants={pageVariants}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}>
            Home
        </motion.div>
    );
};

export default Home;