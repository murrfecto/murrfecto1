import React from 'react';
import './SupportUs.scss'
import SupportCard from "../SupportCard/SupportCard";
import oneTimeFood from '../../../../assets/one-time-food.png'
import plates from '../../../../assets/plates.png'
import treatsAndMeds from '../../../../assets/toys.png'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {openModal} from "../../../../store/modalSlice";

const SupportUs = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate()
    const handleOpenModal = (selectedOption) => {
        dispatch(openModal(selectedOption)); // Виклик диспетчера для відкриття
        // модального вікна
    };
    const handleNavigateContacts = ()=>{
        navigate('/contacts/#contacts_np')
    }

    return (
        <div className='container'>
            <aside className={'support'}>
                <h2>Як підтримати котиків</h2>
                <div className={'support-container'}>
                    <SupportCard onCardClick={()=>handleOpenModal('onetime')} src={oneTimeFood} alt={'one-time-food'} header={"Одноразово"}
                                 text={'Один клік - порція корму'}/>
                    <SupportCard onCardClick={()=>handleOpenModal('monthly')} src={plates} alt={'one-month-food'} header={"Щомісячно"}
                                 text={'Щомісячний платіж означає, що кіт буде під наглядом протягом місяця'}/>
                    <SupportCard onCardClick={handleNavigateContacts} src={treatsAndMeds} alt={'meds-treats'} header={"Корм, ліки, іграшки"}
                                 text={'З радістю приймаємо корм, засоби для обробки, ліжка і іграшки для кошенят'}/>
                </div>
            </aside>
        </div>

    );
};

export default SupportUs;
