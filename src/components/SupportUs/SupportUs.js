import React from 'react';
import './SupportUs.scss'
import SupportCard from "../SupportCard/SupportCard";
import oneTimeFood from '../../assets/one-time-food.svg'
import treatsAndMeds from '../../assets/meds-treats-etc.svg'

const SupportUs = () => {
    return (
        <aside className={'support'}>
            <h2>Як підтримати котиків</h2>
            <div className={'support-container'}>
                <SupportCard src={oneTimeFood} alt={'one-time-food'} header={"Одноразово"}
                             text={'Один клік - порція корму'}/>
                <SupportCard src={oneTimeFood} alt={'one-time-food'} header={"Щомісячно"}
                             text={'Щомісячний платіж означає, що кіт буде під наглядом протягом місяця'}/>
                <SupportCard src={treatsAndMeds} alt={'one-time-food'} header={"Корм, ліки, іграшки"}
                             text={'З радістю приймаємо корм, засоби для обробки, ліжка і іграшки для кошенят'}/>

            </div>

        </aside>
    );
};

export default SupportUs;