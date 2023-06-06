import React, {useEffect, useState} from 'react';
import "./CatsGallery.scss";
import CatItem from "../CatItem/CatItem";
import axios from "axios";
import Notiflix from "notiflix";
import Spinner from "../../helpers/Spinner/Spinner";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import editIcon from "../../assets/admin/edit-icon.svg"
import deleteIcon from "../../assets/admin/delete-icon.svg"
const CatsGallery = ({limit, displayIcon, select}) => {
    const [cats, setCats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shouldDisplayTrashIcon, setShouldDisplayTrashIcon] = useState(displayIcon)
    const [_, setShouldBeSelected] = useState(select)
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/cats');
            setCats(response.data);
            setLoading(false);
        } catch (e) {
            console.log(e.message);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/cats/${id}`);
            console.log(response.data);
            setCats(cats.filter((item) => item._id !== id));
            await getData();
        } catch (error) {
            console.log(id);
            console.error(error);
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
            },{
                cancelButtonColor: '#DF4242',
                cancelButtonBackground: 'none',
                okButtonColor: '#29CA56',
                okButtonBackground: 'none',
                width: '385px',
                messageFontSize:'20px'
            },
        );
    };

    useEffect(() => {
        setShouldDisplayTrashIcon(displayIcon)
        setShouldBeSelected(select)
        getData();
    }, []);

    if (loading) {
        return <Spinner/>;
    }

    const container = {
        hidden :{opacity:1, scale:0},
        visible: {
            opacity: 1,
            scale: 1,
            transition:{
                delayChildren:0.2,
                staggerChildren:0.1
            }
        }
    }

    const items ={
        hidden: { y:20,opacity:0},
        visible: {
            y:0,
            opacity:1
        }
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
                            alt={cat.name}
                            name={cat.name}
                            age={cat.age}
                            gender={cat.gender}
                            chippedInfo={cat?.chipped}
                            id={cat?._id}
                            select={select}
                            trash={
                                shouldDisplayTrashIcon ? (
                                    <div className={'viewAll__icons'}>
                                        <img
                                            src={editIcon}
                                            className={'viewAll__edit'}
                                            onClick={() => handleEdit(cat._id)}
                                        />
                                        <img
                                            src={deleteIcon}
                                            className="viewAll__trash"
                                            onClick={() => confirmDelete(cat._id, cat.name)}
                                        />
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
