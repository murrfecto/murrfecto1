import React, {useEffect, useState} from 'react';
import "./CatsGallery.scss";
import CatItem from "../CatItem/CatItem";
import axios from "axios";
import Spinner from "../../helpers/Spinner/Spinner";


const CatsGallery = ({ limit }) => {
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

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <ul className="cats_cards">
            {cats?.slice(0, limit).map((cat) => (
                <CatItem
                    key={cat._id}
                    src={cat.image}
                    alt={cat.name}
                    name={cat.name}
                    description={cat.description}
                    chippedInfo={cat?.chipped}
                />
            ))}
        </ul>
    );
};

export default CatsGallery;