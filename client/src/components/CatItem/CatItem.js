import React, { useState } from "react";
import "./CatItem.scss";
import paw from "../../assets/paw.svg";
import info from "../../assets/info-rounded.svg";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const CatItem = ({
  src,
  srcBack,
  alt,
  name,
  description,
  chippedInfo,
  id,
  trash,
  select,
  gender,
  age,
}) => {
  const [isCardRotate, setIsCardRotate] = useState(false);

  const handleClick = () => {
    if (window.innerWidth <= 768) {
      setIsCardRotate(!isCardRotate);
    }
  };

  return (
    <li
      className={`cat_card ${isCardRotate ? "cat_card-rotate" : ""}`}
      key={id}
      onClick={handleClick}
    >
      <div className="cat_card-front">
        {select ? (
          <div>
            {src === undefined ? (
              <Skeleton
                variant="rect"
                style={{ borderRadius: "20px" }}
                width={305}
                height={295}
              />
            ) : (
              <>
                {src && <img className="cat_card-icon" src={src} alt={alt} />}
              </>
            )}
            <div className="cat_card-wrapper">
              <div className="cat_card-name">
                <p>{name}</p>
              </div>
              <div className="cat_card-description">
                <img src={paw} alt="paw" />
                <p>
                  {gender}, {age}
                </p>
              </div>
              <div className="cat_card-chipped">
                <img src={info} alt="info" />
                <p>{chippedInfo}</p>
              </div>
              <div className="cat_card-trash">{trash}</div>
            </div>
          </div>
        ) : (
          <div>
            {src === undefined ? (
              <Skeleton
                variant="rect"
                style={{ borderRadius: "20px" }}
                width={305}
                height={295}
              />
            ) : (
              <>
                {src && <img className="cat_card-icon" src={src} alt={alt} />}
              </>
            )}
            <div className="cat_card-wrapper">
              <div className="cat_card-name">
                <p>{name}</p>
              </div>
              <div className="cat_card-description">
                <img src={paw} alt="paw" />
                <p>
                  {gender}, {age}
                </p>
              </div>
              <div className="cat_card-chipped">
                <img src={info} alt="info" />
                <p>{chippedInfo}</p>
              </div>
              <div className="cat_card-trash">{trash}</div>
            </div>
          </div>
        )}
      </div>
      <div className="cat_card-back">
        {select ? (
          <div>
            {srcBack === undefined ? (
              <Skeleton
                variant="rect"
                style={{ borderRadius: "20px" }}
                width={305}
                height={295}
              />
            ) : (
              <>
                {srcBack && (
                  <img className="cat_card-icon" src={srcBack} alt={alt} />
                )}
              </>
            )}
            <div className="cat_card-wrapper">
              <Link className="cat_card-link" to={`/cat/${id}`}>
                Докладніше
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {srcBack === undefined ? (
              <Skeleton
                variant="rect"
                style={{ borderRadius: "20px" }}
                width={305}
                height={295}
              />
            ) : (
              <>
                {srcBack && (
                  <img className="cat_card-icon" src={srcBack} alt={alt} />
                )}
              </>
            )}
            <div className="cat_card-wrapper">
              <Link className="cat_card-link" to={`/cat/${id}`}>
                Докладніше
              </Link>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default CatItem;
