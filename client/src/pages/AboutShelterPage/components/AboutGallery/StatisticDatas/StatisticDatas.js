import "./StatisticDatas.scss";
import "../AboutDescription.scss";
import { ReactComponent as HeartIcon } from "../../../../../assets/about-page/statistic/icon-heart.svg";
import { ReactComponent as MoneyIcon } from "../../../../../assets/about-page/statistic/icon-money.svg";
import { ReactComponent as HandsIcon } from "../../../../../assets/about-page/statistic/icon-hands.svg";

const StatisticDatas = () => {
  return (
    <section className="about_section">
        <ul className="statistic_list">
          <li className="statistic_item">
            <div className="icon_wrapper">
              <HeartIcon width={130} height={130} />
            </div>
            <p className="statistic_text description_text">
              Щоденно годуємо понад 20 котів
            </p>
          </li>
          <li className="statistic_item">
            <div className="icon_wrapper">
              <MoneyIcon width={130} height={130} />
            </div>
            <p className="description_text">
              Щомісяця витрачаємо близько 24 000 грн
            </p>
          </li>
          <li className="statistic_item">
            <div className="icon_wrapper">
              <HandsIcon width={130} height={130} />
            </div>
            <p className="description_text mob_width">
              Понад 7 років постійно годуємо стабільний прайд
            </p>
          </li>
        </ul>
    </section>
  );
};
export default StatisticDatas;
