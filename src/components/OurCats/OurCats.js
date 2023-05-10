import React from 'react';
import './OurCats.scss'
import CatCards from "../CatCards/CatCards";
import tim_cat from '../../assets/tim_cat.svg'
import zoia_cat from '../../assets/zoia_cat.svg'
import shtepa_cat from '../../assets/shtepa_cat.svg'
import boris_cat from '../../assets/boris_cat.svg'
import buba_cat from '../../assets/buba_cat.svg'
import semen_cat from '../../assets/semen_cat.svg'
import snizhok_cat from '../../assets/snizhok_cat.svg'
import sad_cat from '../../assets/sad_cat.svg'

const OurCats = () => {
    return (
        <article>
            <h2>Наші хвости</h2>
            <div className={'cats_cards'}>
                <CatCards src={shtepa_cat} alt={'cat'} name={"Штепа"} description={'кіт, 5 років'}
                          chippedInfo={'нечипований'}/>
                <CatCards src={zoia_cat} alt={'cat'} name={"Зоя"} description={'кішка, 2 роки'}
                          chippedInfo={'нечипована'}/>
                <CatCards src={boris_cat} alt={'cat'} name={"Штепа"} description={'кіт, 5 років'}
                          chippedInfo={'нечипований'}/>
                <CatCards src={buba_cat} alt={'cat'} name={"Буба"} description={'кішка, 4 роки'}
                          chippedInfo={'нечипована'}/>
                <CatCards src={semen_cat} alt={'cat'} name={"Семен Прибіжабль"} description={'кіт, 3 роки'}
                          chippedInfo={'чипований'}/>
                <CatCards src={snizhok_cat} alt={'cat'} name={"Борис"} description={'кіт, 2 роки'}
                          chippedInfo={'нечипований'}/>
                <CatCards src={tim_cat} alt={'cat'} name={"Тім Байрактарович"} description={'кіт, 6 місяців'}
                          chippedInfo={'нечипований'}/>
                <CatCards src={sad_cat} alt={'cat'} name={"Сніжок"} description={'кіт, 5 років'}
                          chippedInfo={'нечипований'}/>
            </div>
            <a className={'cats_cards-link'} href="#">Переглянути усіх</a>
        </article>
    );
};

export default OurCats;