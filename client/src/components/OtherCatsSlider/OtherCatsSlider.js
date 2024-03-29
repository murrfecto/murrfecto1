import React, { useEffect, useMemo, useState } from 'react';
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import CartItem from '../CatItem/CatItem';
import './OtherCatsSlider.scss';
import "swiper/css";
import Spinner from "../../helpers/spinner/Spinner";
import {_ENDPOINT} from "../../variables/variables";

const OtherCatsSlider = ({ cat }) => {
    const [cats, setCats] = useState(null);
    const [loading, setLoading] = useState(true);

    const getCats = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${_ENDPOINT}/cats`);
            setCats(response.data);
            setLoading(false);
        } catch (e) {
            console.log(e.message);
            setLoading(false);
        }
    };

    const filteredCats = useMemo(() => {
        if (cats && cat) {
            return cats.filter((currentCat) => currentCat._id !== cat._id);
        }
        return cats;
    }, [cats, cat]);

    useEffect(() => {
        getCats();
    }, []);

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
            {!loading ? (
                filteredCats?.map((item, index) => {
                    const { name, chipped, _id, gender, age } = item;
                    return (
                        <SwiperSlide key={index}>
                            <div className='slider__content'>
                                <CartItem
                                    id={_id}
                                    alt={name}
                                    name={name}
                                    src={item.images[0]}
                                    srcBack={item.images[1] || item.images[0]}
                                    age={age}
                                    gender={gender}
                                    select={true}
                                    chippedInfo={chipped}
                                />
                            </div>
                        </SwiperSlide>
                    );
                })
            ) : (
                <Spinner />
            )}
        </Swiper>
    );
};

export default OtherCatsSlider;
