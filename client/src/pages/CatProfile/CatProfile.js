import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Title from "../../components/Title/Title";
import './CatProfile.scss';
import PersonalInfo from "./components/PersonalInfo";
import paw from '../../assets/paw.svg';
import calendar from '../../assets/calendar.svg';
import infoRounded from '../../assets/info-rounded.svg';
import CatsGallery from "../../components/CatsGallery/CatsGallery";
import {Skeleton} from "@mui/material";


const CatProfile = () => {
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [cat, setCat] = useState(null);
    const [photos, setPhotos] = useState([]);
    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/cats/${id}`);
            setCat(response.data);
            setPhotos(response.data.images)
            setLoading(false);
        } catch (e) {
            console.log(e.message);
            setLoading(false);
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


    return (
        <div>
            <Title text={cat?.name}/>
            <div className="profile">
                <section className="profile__wrapper">
                    <div className="profile__wrapper_images">
                        {loading ? (
                            <div>
                                <Skeleton
                                    animation="wave"
                                    variant="rectangular"
                                    className="skeleton-photo skeleton-main-photo"
                                />
                                <div className={'skeleton-flex'}>
                                    <Skeleton
                                        animation="wave"
                                        variant="rectangular"
                                        className="skeleton-photo skeleton-secondary-photo"
                                    />
                                    <Skeleton
                                        animation="wave"
                                        variant="rectangular"
                                        className="skeleton-photo skeleton-secondary-photo"
                                    />
                                    <Skeleton
                                        animation="wave"
                                        variant="rectangular"
                                        className="skeleton-photo skeleton-secondary-photo"
                                    />
                                </div>
                            </div>
                        ) : (
                            photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo}
                                    alt=""
                                    onClick={() => handlePhotoClick(index)}
                                />
                            ))
                        )}
                    </div>
                    <div className="profile__wrapper_info">
                        <h2 className="info__title">Ти можеш
                            допомогти <br/> {cat?.name}
                        </h2>
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
                        <h3 className='info__subtitle'>Інформація</h3>
                        <hr/>
                        <p className='info__desc'>{cat?.description}</p>
                        <button className='info__help'>допомогти</button>
                    </div>
                </section>
                <section className='profile__others'>
                    <h2 className='profile__others_title'>Інші пухнастики</h2>
                    <CatsGallery select={true} limit={4}/>
                </section>
                <Link to={'/tails'} className='profile__all'>Переглянути усіх</Link>
            </div>
        </div>
    );
};

export default CatProfile;
