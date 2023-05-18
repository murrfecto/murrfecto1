import "./AboutDescription.scss";
import deskFirst from "../../../assets/about-page/desktop/about-one-min.jpg";
import deskSecond from "../../../assets/about-page/desktop/about-two-min.jpg";
import deskThird from "../../../assets/about-page/desktop/about-three-min.jpg";

const AboutDescription = () => {
  return (
    <section className="about_description">
      <div className="container">
        <ul className="list">
          <li className="item">
            <picture>
              <source srcSet={deskFirst} media="(min-width: 390px)" />

              <img
                className="img"
                src={deskFirst}
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
              <source srcSet={deskSecond} media="(min-width: 390px)" />

              <img
                className="img"
                src={deskSecond}
                alt="Три коти"
                width={359}
              />
            </picture>
            <p className="description_text">
              Є багато котів, які живуть прайдом в більш-менш безпечному місці,
              мають свої звички і почуваються досить добре, аби була б постійна
              їжа.
            </p>
          </li>
          <li className="item">
            <picture>
              <source srcSet={deskThird} media="(min-width: 390px)" />

              <img className="img" src={deskThird} alt="Три коти" width={359} />
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
