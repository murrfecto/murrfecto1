import React, {useEffect, useState, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {chunk} from "lodash";
import {motion} from "framer-motion";
import Title from "../../components/Title/Title";
import "./CatProfile.scss";
import PersonalInfo from "./components/personalInfo/PersonalInfo";
import paw from "../../assets/paw.svg";
import calendar from "../../assets/сalendar.svg";
import infoRounded from "../../assets/info-rounded.svg";
import OtherCatsSlider from "../../components/OtherCatsSlider/OtherCatsSlider";
import {Loading} from "notiflix";
import ModalButton from "../../components/ModalButton/ModalButton";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";
import {_ENDPOINT} from "../../variables/variables";
import catProfileBanner from '../../assets/banners/catCard.jpg'

const CatProfile = () => {
    const [_, setLoading] = useState(true);
    const {id} = useParams();
    const [cat, setCat] = useState(null);
    const [photos, setPhotos] = useState([]);
    const targetRef = useRef(null);
    const getData = async () => {
        try {
            Loading.standard({
                backgroundColor: "rgba(208, 190, 196, 0.8)",
                svgColor: "#4B3542",
            });
            const response = await axios.get(
                `${_ENDPOINT}/cats/${id}`
            );
            setCat(response.data);
            const firstFourPhotos = chunk(response.data.images, 4)[0];
            setPhotos(firstFourPhotos);
            targetRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            Loading.remove();
        } catch (e) {
            console.log(e.message);
            setLoading(false);
            Loading.remove();
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    const handlePhotoClick = (index) => {
        const updatedPhotos = [...photos];
        const clickedPhoto = updatedPhotos.splice(index, 1);
        updatedPhotos.unshift(clickedPhoto[0]);
        setPhotos(updatedPhotos);
    };

    const container = {
        hidden: {opacity: 1, scale: 0.95},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.7,
                staggerChildren: 0.7,
            },
        },
    };

    const item = {
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <div ref={targetRef}>
            <title>{cat?.name}</title>
            <Title text={cat?.name} backgroundImage={catProfileBanner}/>
            <motion.div variants={container}
                        initial='hidden'
                        animate='visible'>
                <div className="profile">
                    <div className='container'>
                        <section className="profile__wrapper">
                            <motion.div
                                className="profile__wrapper_images"
                                variants={container}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.img
                                    key={0}
                                    variants={item}
                                    src={photos[0]}
                                    alt=""
                                    className='profile__wrapper_images_first'
                                    onClick={() => handlePhotoClick(0)}
                                />

                                <div className="grouped-images">
                                    {photos.slice(1).map((photo, index) => (
                                        <motion.img
                                            className='grouped-images_item'
                                            key={index + 1}
                                            variants={item}
                                            src={photo}
                                            alt=""
                                            onClick={() => handlePhotoClick(index + 1)}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                            <div className="profile__wrapper_info">
                                <h2 className="info__title">Ви можете допомогти {cat?.name}</h2>
                                <div className="info__wrapper">
                                    <PersonalInfo type={"Стать"} title={cat?.gender} icon={paw}/>
                                    <PersonalInfo type={"Вік"} title={cat?.age} icon={calendar}/>
                                    <PersonalInfo
                                        type={"Наявність чіпа"}
                                        title={cat?.chipped}
                                        icon={infoRounded}
                                    />
                                </div>
                                <div className="info__subtitle">
                                    <h3>Інформація</h3>
                                    <hr/>
                                </div>
                                <p className="info__desc">
                                    {cat?.description.trim() === '' ? 'Наразі інформації про кота немає' : cat?.description}
                                </p>
                                <div className={"info__help"}>
                                    <ModalButton title={"Допомогти"} style={'footer_donation-catProfile'}/>
                                </div>
                            </div>
                        </section>
                    </div>

                    <section className="profile__others">
                        <h2 className="profile__others_title">Інші пухнастики</h2>
                        <div className="profile__others_slider">
                            <OtherCatsSlider cat={cat}/>
                        </div>
                    </section>
                    <Link to={"/tails"} className="profile__all">
                        Переглянути усіх
                    </Link>
                </div>
            </motion.div>

            <ScrollToTop/>
        </div>
    );
};

export default CatProfile;
