import React from "react";
import Title from "../../components/Title/Title";
import Contacts from "./components/Contacts/Contacts";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";
import {motion} from "framer-motion";

export const ContactsPage = () => {
    const container = {
        hidden :{opacity:1, scale:0.95},
        visible: {
            opacity: 1,
            scale: 1,
            transition:{
                delayChildren:0.2,
                staggerChildren:0.1
            }
        }
    }
  return (
    <main>
      <Title text="Контакти" />
        <motion.div variants={container}
                    initial='hidden'
                    animate='visible' className='pages-container'>
            <Contacts />
            <ScrollToTop />
        </motion.div>
    </main>
  );
};
