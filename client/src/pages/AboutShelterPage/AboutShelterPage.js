import "./AboutShelterPage.scss";

import Title from "../../components/Title/Title";
import AboutDescription from "../../components/AboutShelter/AboutGallery/AboutDescription";
import StatisticDatas from "../../components/AboutShelter/AboutGallery/StatisticDatas/StatisticDatas";
import ReportSection from "../../components/AboutShelter/ReportSection/ReportSection";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";

const AboutShelterPage = () => {
  return (
    <main>
      <Title text="Про притулок" />
      <div className="main_about">
        <AboutDescription />
        <StatisticDatas />
        <ReportSection />
      </div>
      <ScrollToTop />
    </main>
  );
};

export default AboutShelterPage;
