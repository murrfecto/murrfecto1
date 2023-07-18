import "./AboutShelterPage.scss";

import Title from "../../components/Title/Title";
import AboutDescription from "./components/AboutGallery/AboutDescription";
import StatisticDatas from "./components/AboutGallery/StatisticDatas/StatisticDatas";
import ReportSection from "./components/ReportSection/ReportSection";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";
import {motion} from "framer-motion";

const AboutShelterPage = () => {
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
              <Title text="Про притулок" />
              <motion.div variants={container}
                          initial='hidden'
                          animate='visible' className='pages-container'>
                  <div className="main_about">
                      <AboutDescription />
                      <StatisticDatas />
                      <ReportSection />
                  </div>
              </motion.div>

              <ScrollToTop />
          </main>



  );
};

export default AboutShelterPage;
