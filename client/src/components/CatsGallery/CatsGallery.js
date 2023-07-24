import React, {useEffect, useState} from 'react';
import axios from "axios";
import Notiflix from "notiflix";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";

import Spinner from "../../helpers/spinner/Spinner";
import CatItem from "../CatItem/CatItem";
import useCustomAxios from "../../hooks/useCustomAxios";
import {_ENDPOINT} from "../../variables/variables";

import editIcon from "../../assets/admin/edit-icon.svg"
import deleteIcon from "../../assets/admin/delete-icon.svg"

import "./CatsGallery.scss";


const CatsGallery = ({limit, displayIcon, select, pawCursor}) => {
    const [cats, setCats] = useState(null);
    const [shouldDisplayTrashIcon, setShouldDisplayTrashIcon] = useState(displayIcon)
    const [_, setShouldBeSelected] = useState(select)
    const navigate = useNavigate();
    const {data, loading, get} = useCustomAxios();

    useEffect(() => {
        get(`${_ENDPOINT}/cats`)
    }, []);

    useEffect(() => {

        if (data) {
            setCats(data)
        }
    }, [data]);

    useEffect(() => {
        setShouldDisplayTrashIcon(displayIcon)
        setShouldBeSelected(select)
    }, []);


    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${_ENDPOINT}/cats/${id}`);
            setCats(cats.filter((item) => item._id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/cats/editCat/${id}`);
    };

    const confirmDelete = (id, name) => {
        Notiflix.Confirm.show(
            '',
            `Ви дійсно хочете видалити картку ${name}?`,
            '&#x2713; Так',
            '&#x2717; Скасувати',
            function okCb() {
                handleDelete(id);
            },
            {
                width: '320px',
                borderRadius: '2px',
                titleColor: 'orangered',
                okButtonBackground: 'orangered',
                cssAnimationStyle: 'zoom',
            }, {
                cancelButtonColor: '#DF4242',
                cancelButtonBackground: 'none',
                okButtonColor: '#29CA56',
                okButtonBackground: 'none',
                width: '385px',
                messageFontSize: '20px'
            },
        );
    };

    const container = {
        hidden: {opacity: 1, scale: 0},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    }

    const items = {
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1
        }
    }

    if (loading) {
        return <Spinner/>;
    }

    return (
        <motion.div
            variants={container}
            initial='hidden'
            animate='visible'
        >
            <ul className="cats_cards">
                {cats?.slice(0, limit).map((cat) => (
                    <motion.div key={cat._id}
                                variants={items}
                    >
                        <CatItem
                            src={cat?.images && cat.images.length > 0 ? cat.images[0] : null}
                            srcBack={cat?.images && cat.images.length > 0 ? cat.images[1] || cat.images[0] : null}
                            alt={cat.name}
                            name={cat.name.length > 12 ? cat.name.slice(0, 12) + '...' : cat.name}
                            age={cat.age}
                            gender={cat.gender}
                            chippedInfo={cat?.chipped}
                            id={cat?._id}
                            select={select}
                            trash={
                                shouldDisplayTrashIcon ? (
                                    <div className={'viewAll__icons'}>
                                        <img
                                            style={{cursor: "pointer"}}
                                            src={editIcon}
                                            className={'viewAll__edit'}
                                            onClick={() => handleEdit(cat._id)}
                                            alt={'edit icon'}/>
                                        <img
                                            style={{cursor: "pointer"}}
                                            src={deleteIcon}
                                            className="viewAll__trash"
                                            onClick={() => confirmDelete(cat._id, cat.name)}
                                            alt={'delete icon'}/>
                                    </div>
                                ) : null
                            }
                        />
                    </motion.div>
                ))}
            </ul>
        </motion.div>
    );
};

export default CatsGallery;
