import "./AboutShelterPage.scss";

import Title from "../../components/Title/Title";
import AboutDescription from "../../components/AboutShelter/AboutGallery/AboutDescription";
import StatisticDatas from "../../components/AboutShelter/AboutGallery/StatisticDatas/StatisticDatas";

const AboutShelterPage = () => {
  return (
    <main>
      <Title text="Про притулок" />
      <div className="main_about">
        <AboutDescription />
        <StatisticDatas />
      </div>
    </main>
  );
};

export default AboutShelterPage;
