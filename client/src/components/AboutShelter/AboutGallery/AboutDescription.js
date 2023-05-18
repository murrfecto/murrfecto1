import "./AboutDescription.scss";
import mobFirst from "../../../assets/about-page/desktop/about-one-min.jpg";
import mobFirst2x from "../../../assets/about-page/desktop/about-one2x-min.jpg";
import mobSecond from "../../../assets/about-page/desktop/about-two-min.jpg";
import mobSecond2x from "../../../assets/about-page/desktop/about-two2x-min.jpg";
import mobThird from "../../../assets/about-page/desktop/about-three-min.jpg";
import mobThird2x from "../../../assets/about-page/desktop/about-three2x-min.jpg";

const AboutDescription = () => {
  return (
    <section className="about_description">
      <div className="container">
        <ul className="list">
          <li>
            <picture>
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
          <li>
            <picture>
              <source srcSet={mobSecond} media="(min-width: 390px)" />

              <img className="img" src={mobSecond} alt="Три коти" width={359} />
            </picture>
            <p className="description_text">
              Є багато котів, які живуть прайдом в більш-менш безпечному місці,
              мають свої звички і почуваються досить добре, аби була б постійна
              їжа.
            </p>
          </li>
          <li>
            <picture>
              <source srcSet={mobThird} media="(min-width: 390px)" />

              <img className="img" src={mobThird} alt="Три коти" width={359} />
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
