import React, {useEffect, useState} from 'react';
import axios from "axios";
import './ViewAll.scss';
import Spinner from "../../../../helpers/Spinner/Spinner";
import CatsGallery from "../../../../components/CatsGallery/CatsGallery";

const ViewAllCats = () => {
    const [_, setCats] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const response = await axios.get('https://murrfecto.foradmin.fun/api/v1/cats');
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
            <h1 className='viewAll__title'>Всі коти</h1>
                <CatsGallery displayIcon={true} select={false}/>
        </div>
    );
};

export default ViewAllCats;
