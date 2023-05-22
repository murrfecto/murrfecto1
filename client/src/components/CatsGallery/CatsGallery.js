import React, {useEffect, useState} from 'react';
import "./CatsGallery.scss";
import CatItem from "../CatItem/CatItem";
import axios from "axios";

import Notiflix from "notiflix";
import {FaTrash} from "react-icons/fa";
import Spinner from "../../helpers/Spinner/Spinner";


const CatsGallery = ({limit, displayIcon, select}) => {
    const [cats, setCats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shouldDisplayTrashIcon, setShouldDisplayTrashIcon] = useState(displayIcon)
    const [shouldBeSelected, setShouldBeSelected] = useState(select)
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

    const confirmDelete = (id, name) => {
        Notiflix.Confirm.show(
            'Removal',
            `Are you sure you want to delete ${name}?`,
            'Так',
            'Ні',
            function okCb() {
                handleDelete(id);
            },
            {
                width: '320px',
                borderRadius: '2px',
                titleColor: 'orangered',
                okButtonBackground: 'orangered',
                cssAnimationStyle: 'zoom',
            }
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

    return (
        <ul className="cats_cards">
            {cats?.slice(0, limit).map((cat) => (
                <div key={cat._id}>
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
                            <FaTrash
                                className="viewAll__trash"
                                size={25}
                                onClick={() => confirmDelete(cat._id, cat.name)}
                            />
                        ) : null
                    }
                    />
                </div>
            ))}
        </ul>
    );
};

export default CatsGallery;
