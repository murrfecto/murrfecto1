import React, {useEffect, useState} from 'react';
import Title from "../../components/Title/Title";
import {useParams} from "react-router-dom";
import axios from "axios";
import './CatProfile.scss';
import {Skeleton} from "@mui/material";

const CatProfile = () => {
    const {id} = useParams();
    const [cat, setCat] = useState(null);
    console.log(id);
    console.log(cat);
    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/cats/${id}`);
            setCat(response.data);
        } catch (e) {
            console.log(e.message);
        }
    };
    useEffect(() => {
        getData();
    }, []);


    return (
        <div>
            <Title text={cat?.name}/>
           <div className='profile'>
               <div className='profile__images'>

               </div>
               <div className='profile__info'>
                   <h2>Ти можеш допомогти {cat?.name}</h2>
               </div>
           </div>
        </div>
    );
};

export default CatProfile;