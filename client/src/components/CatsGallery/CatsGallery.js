import React, {useEffect, useState} from 'react';
//import './OurCats.scss'
import CatItem from "../CatItem/CatItem";
import axios from "axios";


const CatsGallery = () => {
    const [cats, setCats] = useState(null);
    const getData = async () => {
        try {
           const response = await axios.get('http://localhost:3000/cats')
            setCats(response.data)
        } catch (e) {
            console.log(e.message)
        }
    }
    useEffect(() => {
        getData()
    })
    return (
            <ul className={'cats_cards'}>
                {cats?.map((cat) => (
                        <CatItem key={cat._id} src={cat.image} alt={cat.name} name={cat.name} description={cat.description}
                                  chippedInfo={cat?.chipped}/>
                ))}
            </ul>
        
    );
};

export default CatsGallery;