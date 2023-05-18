import React, {useEffect, useState} from 'react';
import axios from "axios";
import CatCards from "../../../../components/CatCards/CatCards";
import './ViewAll.scss';
import {FaTrash} from "react-icons/fa";
import Notiflix from "notiflix";
import Spinner from "../../../../helpers/Spinner/Spinner";

const ViewAllCats = () => {
    const [cats, setCats] = useState(null);
    const [loading, setLoading] = useState(true);

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
        getData();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="viewAll">
            <div className="cats_cards">
                {cats?.map((cat) => (
                    <CatCards
                        key={cat._id}
                        src={cat?.image}
                        alt={cat?.name}
                        name={cat?.name}
                        description={cat?.description}
                        chippedInfo={cat?.chipped}
                        trash={
                            <FaTrash
                                className="viewAll__trash"
                                size={25}
                                onClick={() => confirmDelete(cat._id, cat.name)}
                            />
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default ViewAllCats;