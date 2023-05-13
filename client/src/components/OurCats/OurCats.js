import React, {useEffect, useState} from 'react';
import './OurCats.scss'
import CatCards from "../CatCards/CatCards";
import CatsGallery from "../CatsGallery/CatsGallery"
//import axios from "axios";


const OurCats = () => {
    // const [cats, setCats] = useState(null);
    // const getData = async () => {
    //     try {
    //        const response = await axios.get('http://localhost:3000/cats')
    //         setCats(response.data)
    //     } catch (e) {
    //         console.log(e.message)
    //     }
    // }
    // useEffect(() => {
    //     getData()
    // })
    return (
        <article>
            <h2>Наші хвости</h2>
            <CatsGallery />
            <a className={'cats_cards-link'} href="#">Переглянути усіх</a>
        </article>
    );
};

export default OurCats;