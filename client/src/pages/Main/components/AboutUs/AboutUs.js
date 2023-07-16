import React from 'react';
import './AboutUs.scss'
import collage from '../../../../assets/collage.png'
import paw from '../../../../assets/paw.png'

const AboutUs = () => {
    return (
        <section className={'about_container'}>
            <img className={'about_collage'} src={collage} alt="cats-collage"/>
            <div className={'about_info'}>
                <h2>Хто ми?</h2>
                <div className={'about_info-block'}>
                    <img className={'about_info-icon'} src={paw} alt="paw-icon"/>
                    <p>
                        Притулок Murrfecto в Києві опікується котами, які поруч з нами переживають буремні часи.
                    </p>
                </div>
                <div className={'about_info-block'}>
                    <img className={'about_info-icon'} src={paw} alt="paw-icon"/>
                    <p>
                        Наш притулок має близько 20 хвостів, що живуть поруч. Прайд підтримується стабільною сумою коштів з місяця в місяць
                    </p>
                </div>
                <div className={'about_info-block'}>
                    <img className={'about_info-icon'} src={paw} alt="paw-icon"/>
                    <p>
                        Коти стійко переносять все, що випадає на їхню нелегку котячу долю в цей час, але в наших силах щоденно їх погодувати і почухати за вухом.
                    </p>
                </div>
                <div className={'about_info-block'}>
                    <img className={'about_info-icon'} src={paw} alt="paw-icon"/>
                    <p>
                        Запрошуємо тебе стати віртуальним володарем справжнього кота. І він тобі віддячить!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
