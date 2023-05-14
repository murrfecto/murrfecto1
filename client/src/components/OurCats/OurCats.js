import React, {useEffect, useState} from 'react';
import './OurCats.scss'
import CatCards from "../CatCards/CatCards";
import axios from "axios";


const OurCats = () => {
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
    },[])
    console.log(cats);
    return (
        <article>
            <h2>Наші хвости</h2>
            <div className={'cats_cards'}>
                {cats?.map((cat,index) => (
                        <CatCards key={index} src={cat?.image} alt={cat?.name} name={cat?.name} description={cat?.description}
                                  chippedInfo={cat?.chipped}/>
                ))}

            </div>
            <a className={'cats_cards-link'} href="#">Переглянути усіх</a>
        </article>
    );
};

export default OurCats;