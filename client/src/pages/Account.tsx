import React from 'react';
import {pageVariants} from "../styles/variants";
import {motion} from "framer-motion";

const Account = () => {
    return (
        <motion.div className={''}
                    variants={pageVariants}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}>
            Account
        </motion.div>
    );
};

export default Account;