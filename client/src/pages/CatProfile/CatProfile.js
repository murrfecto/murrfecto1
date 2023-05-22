import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import Title from "../../components/Title/Title";
import './CatProfile.scss';
import PersonalInfo from "./components/PersonalInfo";
import paw from '../../assets/paw.svg';
import calendar from '../../assets/calendar.svg';
import infoRounded from '../../assets/info-rounded.svg';
import CatsGallery from "../../components/CatsGallery/CatsGallery";


const CatProfile = () => {

    const initialPhotos = [
        "https://s13.stc.yc.kpcdn.net/share/i/instagram/B44solahwlo/wr-1280.webp",
        "https://c.files.bbci.co.uk/116AB/production/_115093317_neo4.jpg",
        "https://kor.ill.in.ua/m/610x385/2229578.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg"
    ];

    const {id} = useParams();
    const [cat, setCat] = useState(null);
    const [photos, setPhotos] = useState(initialPhotos);
    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/cats/${id}`);
            setCat(response.data);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    console.log(cat);

    const handlePhotoClick = (index) => {
        const updatedPhotos = [...photos];
        const clickedPhoto = updatedPhotos.splice(index, 1);
        updatedPhotos.unshift(clickedPhoto[0]);
        setPhotos(updatedPhotos);
    };

    return (
        <div>
            <Title text={cat?.name}/>
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
                        ))}
                    </div>
                    <div className="profile__wrapper_info">
                        <h2 className="info__title">Ти можеш
                            допомогти <br/> {cat?.name}
                        </h2>
                        <PersonalInfo
                            type={'Стать'}
                            title={'кіт'}
                            icon={paw}/>
                        <PersonalInfo
                            type={'Вік'}
                            title={'5 років'}
                            icon={calendar}/>
                        <PersonalInfo
                            type={'Наявність чіпа'}
                            title={cat?.chipped}
                            icon={infoRounded}/>
                        <h3 className='info__subtitle'>Інформація</h3>
                        <hr/>
                        <p className='info__desc'>{cat?.description}</p>
                        <button className='info__help'>допомогти</button>
                    </div>
                </section>
                <section className='profile__others'>
                    <h2 className='profile__others_title'>Інші пухнастики</h2>
                    <CatsGallery/>
                </section>
            </div>
        </div>
    );
};

export default CatProfile;