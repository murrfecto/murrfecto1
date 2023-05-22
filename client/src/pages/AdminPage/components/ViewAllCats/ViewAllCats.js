import React, {useEffect, useState} from 'react';
import axios from "axios";
import './ViewAll.scss';
import Notiflix from "notiflix";
import Spinner from "../../../../helpers/Spinner/Spinner";
import CatsGallery from "../../../../components/CatsGallery/CatsGallery";

const ViewAllCats = () => {
    const [cats, setCats] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(cats)
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
        return <Spinner/>;
    }

    return (
        <div className="viewAll">
            <CatsGallery displayIcon={true} />
        </div>
    );
};

export default ViewAllCats;