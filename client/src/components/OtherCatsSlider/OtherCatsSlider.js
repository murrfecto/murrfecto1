import React, {useEffect, useState} from 'react';
import {FreeMode, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import axios from "axios";
import CartItem from '../CatItem/CatItem';
import './OtherCatsSlider.scss'
import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";

const OtherCatsSlider = ({cat}) => {

    const [cats, setCats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSlide, setActiveSlide] = useState(0);
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
        getCats();
    }, []);


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



    return (

        <Swiper
            wrapperClass='slider'
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
                clickable: true,
            }}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                },
                968: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 5,
                },
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            {randomCats.map((item, index) => {
                const {name, chipped, _id, gender, age} = item;
                return (

                        <SwiperSlide key={index} >
                            <div className='slider__content' >
                                <CartItem id={_id}

                                          alt={name}
                                          name={name}
                                          src={item.images[0]}
                                          age={age}
                                          gender={gender}
                                          select={true}
                                          chippedInfo={chipped}

                                />
                            </div>


                        </SwiperSlide>
                );
            })}

        </Swiper>
    );
};

export default OtherCatsSlider;