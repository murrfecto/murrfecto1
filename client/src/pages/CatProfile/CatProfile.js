import React, {useEffect, useState,useRef} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Title from "../../components/Title/Title";
import './CatProfile.scss';
import PersonalInfo from "./components/PersonalInfo";
import paw from '../../assets/paw.svg';
import calendar from '../../assets/calendar.svg';
import infoRounded from '../../assets/info-rounded.svg';
import OtherCatsSlider from "../../components/OtherCatsSlider/OtherCatsSlider";
import {Loading} from "notiflix";

const CatProfile = () => {
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [cat, setCat] = useState(null);
    const [photos, setPhotos] = useState([]);
    const targetRef = useRef(null)
    const getData = async () => {
        try {
            Loading.standard({
                backgroundColor:'rgba(208, 190, 196, 0.8)',
                svgColor: '#4B3542'
            })
            const response = await axios.get(`http://localhost:3000/cats/${id}`);
            setCat(response.data);
            setPhotos(response.data.images);
            targetRef.current.scrollIntoView({
                behavior:'smooth',
                block:'start'
            })
            Loading.remove()
        } catch (e) {
            console.log(e.message);
            setLoading(false);
            Loading.remove()
        }
    };



    useEffect(() => {
        getData()
    }, [id]);

    const handlePhotoClick = (index) => {
        const updatedPhotos = [...photos];
        const clickedPhoto = updatedPhotos.splice(index, 1);
        updatedPhotos.unshift(clickedPhoto[0]);
        setPhotos(updatedPhotos);
    };

    return (
        <div ref={targetRef}>
            <Title text={cat?.name} />
            <div className="profile">
                <section className="profile__wrapper">
                    <div className="profile__wrapper_images">
                        {photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo}
                                    alt=""
                                    onClick={() => handlePhotoClick(index)}
                                />
                            ))
                        }
                    </div>
                    <div className="profile__wrapper_info">
                        <h2 className="info__title">Ти можеш
                            допомогти <br/> {cat?.name}
                        </h2>
                        <div className="info__wrapper">
                            <PersonalInfo
                                type={'Стать'}
                                title={cat?.gender}
                                icon={paw}/>
                            <PersonalInfo
                                type={'Вік'}
                                title={cat?.age}
                                icon={calendar}/>
                            <PersonalInfo
                                type={'Наявність чіпа'}
                                title={cat?.chipped}
                                icon={infoRounded}/>
                        </div>

                        <div className="info__subtitle">
                            <h3>Інформація</h3>
                            <hr/>
                        </div>

                        <p className="info__desc">{cat?.description}</p>
                        <button className="info__help">допомогти</button>
                    </div>
                </section>
                <section className="profile__others">
                    <h2 className="profile__others_title">Інші пухнастики</h2>
                    <div className="profile__others_slider">
                        <OtherCatsSlider cat={cat}/>
                    </div>

                </section>
                <Link to={'/tails'} className="profile__all">Переглянути
                    усіх</Link>
            </div>
        </div>
    );
};

export default CatProfile;
