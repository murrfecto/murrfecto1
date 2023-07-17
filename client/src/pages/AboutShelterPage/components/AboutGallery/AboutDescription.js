import "./AboutDescription.scss";
import deskFirst from "../../../../assets/about-page/desktop/about-one-min.jpg";
import deskSecond from "../../../../assets/about-page/desktop/about-two-min.jpg";
import deskThird from "../../../../assets/about-page/desktop/about-three-min.jpg";

import mobFirst from "../../../../assets/about-page/mobile/mobFirst.jpg";
import mobSecond from "../../../../assets/about-page/mobile/mobSecond.jpg";
import mobThird from "../../../../assets/about-page/mobile/mobThird.jpg";

import noteFirst from "../../../../assets/about-page/1280/first_1280.jpg";
import noteSecond from "../../../../assets/about-page/1280/second_1280.jpg";
import noteThird from "../../../../assets/about-page/1280/third_1280.jpg";

const AboutDescription = () => {
  return (
    <section>
      <div className="about_wrapper">
        <ul className="list">
          <li className="item">
            <picture>
              <source srcSet={deskFirst} media="(min-width: 1440px)" />
              <source srcSet={noteFirst} media="(min-width: 1280px)" />
              <source srcSet={mobFirst} media="(min-width: 390px)" />
              <img
                className="img"
                src={mobFirst}
                alt="Дівчина грається з котом"
                width={359}
              />
            </picture>
            <p className="description_text">
              Багато людей хоче завести кота, але не можуть це зробити з певних
              причин: орендоване житло, спротив родини, переїзди і зайнятість.
            </p>
          </li>
          <li className="item">
            <picture>
              <source srcSet={deskSecond} media="(min-width: 1440px)" />
              <source srcSet={noteSecond} media="(min-width: 1280px)" />
              <source srcSet={mobSecond} media="(min-width: 390px)" />

              <img className="img" src={mobSecond} alt="Три коти" width={359} />
            </picture>
            <p className="description_text">
              Є багато котів, які живуть прайдом в більш-менш безпечному місці,
              мають свої звички і почуваються досить добре, аби була б постійна
              їжа.
            </p>
          </li>
          <li className="item">
            <picture>
              <source srcSet={deskThird} media="(min-width: 1440px)" />
              <source srcSet={noteThird} media="(min-width: 1280px)" />
              <source srcSet={mobThird} media="(min-width: 390px)" />
              <img
                className="img"
                src={mobThird}
                alt="Котик їсть"
                width={359}
              />
            </picture>
            <p className="description_text">
              Ми поєднуємо одних з другими, приймаючи від одних щомісячну
              допомогу, годуючи і лікуючи обраного вами кота і надсилаючи вам
              новини з досить бурхливого дворового котячого життя
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default AboutDescription;
