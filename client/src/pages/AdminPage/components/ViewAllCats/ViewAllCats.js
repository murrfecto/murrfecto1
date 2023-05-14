import React, {useEffect, useState} from 'react';
import axios from "axios";
import CatCards from "../../../../components/CatCards/CatCards";
import './ViewAll.scss';

const ViewAllCats = () => {
    const [cats, setCats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const getData = async () => {

        try {
            const response = await axios.get('http://localhost:3000/cats');
            setCats(response.data);
        } catch (e) {
            console.log(e.message);
        }
    };
    useEffect(() => {
        getData();
    },[]);
    return (
            <div className="viewAll">
                <div className={'cats_cards'}>
                    {cats?.map((cat) => (
                        <CatCards src={cat?.image} alt={cat?.name}
                                  name={cat?.name}
                                  description={cat?.description}
                                  chippedInfo={cat?.chipped}/>
                    ))}
                </div>
            </div>
    );
};

export default ViewAllCats;