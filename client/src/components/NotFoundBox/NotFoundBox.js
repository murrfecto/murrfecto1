import { Link } from "react-router-dom";
import "./NotFoundBox.scss";
import img404 from "../../assets/404page/cat404.png";

const NotFoundBox = () => {
  return (
    <main className="main_wrapper">
      <div className="not-found">
        <h2 className={"not-found_title"}>404</h2>
        <p className="not-found_text">
          {" "}
          Ох! Наші котики змушені визнати, що щось пішло не так і сторінка, яку
          ви шукаєте, не може бути знайдена.
        </p>
        <Link to="/" className={"to-main_link"}>
          На Головну
        </Link>
      </div>
      <img
        className="not-found_img"
        src={img404}
        alt="grey cat"
        width={365}
        height={597}
      />
    </main>
  );
};

export default NotFoundBox;
