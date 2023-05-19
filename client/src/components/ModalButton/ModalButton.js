import React, {useState} from 'react';
import Modal from 'react-modal';
import './ModalButton.scss'
import cats from '../../assets/modal/donate_cats.svg'

const ModalButton = ({title}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleDonationClick = () => {
        setModalIsOpen(true);
    };
    return (
        <div id={"donation"} className={"navbar_links footer_donation "}>
            <a href={"#"} onClick={handleDonationClick}>Нагодуй кота</a>
            <Modal className={'modal'} isOpen={modalIsOpen} aria-label="Donate to feed a cat"
                   onRequestClose={() => setModalIsOpen(false)}>
                <div className={'donation__container'}>
                    <img src={cats} alt={'donation__container_cats'}/>
                </div>
                <div className={'donation__container_inner'}>
                    <h4>Зібрані кошти підуть на харчування та медичну допомогу</h4>
                    <button className="donation__container_inner-button footer_donation">
                        <a href={"#"}>{title}</a>
                    </button>
                </div>
            </Modal>
        </div>

    );
};

export default ModalButton;