import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Title from "../../components/Title/Title";
import './CatProfile.scss';
import PersonalInfo from "./components/PersonalInfo";
import paw from '../../assets/paw.svg';
import calendar from '../../assets/calendar.svg';
import infoRounded from '../../assets/info-rounded.svg';
import OtherCatsSlider from "../../components/OtherCatsSlider/OtherCatsSlider";


const CatProfile = () => {
    const {id} = useParams();
    const [cat, setCat] = useState(null);
    const [cats, setCats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/cats/${id}`);
            setCat(response.data);
            setPhotos(response.data.images);
            setLoading(false);
        } catch (e) {
            console.log(e.message);
            setLoading(false);
        }
    };


    const getCats = async () => {
        try {
            const response = await axios.get('http://localhost:3000/cats');
            setCats(response.data);
            setLoading(false);
        } catch (e) {
            console.log(e.message);
            setLoading(false);
        }
    };


    useEffect(() => {
        getData();
        getCats();
    }, [id]);


    const handlePhotoClick = (index) => {
        const updatedPhotos = [...photos];
        const clickedPhoto = updatedPhotos.splice(index, 1);
        updatedPhotos.unshift(clickedPhoto[0]);
        setPhotos(updatedPhotos);
    };

    const getRandomCats = () => {
        const catsCopy = cats ? [...cats] : [];

        if (cat && catsCopy) {
            const catIndex = catsCopy.findIndex((currentCat) => currentCat._id === cat._id);
            if (catIndex !== -1) {
                catsCopy.splice(catIndex, 1);
            }
        }

        const randomCats = [];
        while (randomCats.length < 4 && catsCopy.length > 0) {
            const randomIndex = Math.floor(Math.random() * catsCopy.length);
            const randomCat = catsCopy.splice(randomIndex, 1)[0];
            randomCats.push(randomCat);
        }

        return randomCats;
    };

    const randomCats = getRandomCats();
    console.log(randomCats);

    return (
        <div>
            <Title text={cat?.name}/>
            <div className="profile">
                <section className="profile__wrapper">
                    <div className="profile__wrapper_images">
                        {
                            photos.map((photo, index) => (
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
