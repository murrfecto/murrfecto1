import React from 'react';
import './SupportUs.scss'
import SupportCard from "../SupportCard/SupportCard";
import oneTimeFood from '../../assets/one-time-food.svg'
import plates from '../../assets/plates.svg'
import treatsAndMeds from '../../assets/toys.png'

const SupportUs = () => {
    return (
        <div className='container'>
            <aside className={'support'}>
                <h2>Як підтримати котиків</h2>
                <div className={'support-container'}>
                    <SupportCard src={oneTimeFood} alt={'one-time-food'} header={"Одноразово"}
                                 text={'Один клік - порція корму'}/>
                    <SupportCard src={plates} alt={'one-month-food'} header={"Щомісячно"}
                                 text={'Щомісячний платіж означає, що кіт буде під наглядом протягом місяця'}/>
                    <SupportCard src={treatsAndMeds} alt={'meds-treats'} header={"Корм, ліки, іграшки"}
                                 text={'З радістю приймаємо корм, засоби для обробки, ліжка і іграшки для кошенят'}/>
                </div>
            </aside>
        </div>

    );
};

export default SupportUs;
