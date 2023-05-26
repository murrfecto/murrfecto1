import React, {useState} from 'react';
import Modal from 'react-modal';
import './ModalButton.scss'
import cats from '../../assets/modal/donate_cats.svg'
import DonateForm from "../Donate/DonateForm/DonateForm";

const ModalButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };
    const handleDonationClick = () => {
        setModalIsOpen(true);
    };
    //todo.txt refactor form so it displays good in modal
    return (
        <div id={"donation"} >
            <a className={"navbar_links footer_donation "} onClick={handleDonationClick}>Нагодуй кота</a>
            <Modal className={'modal'} isOpen={modalIsOpen} aria-label="Donate to feed a cat"
                   onRequestClose={() => setModalIsOpen(false)}>
                <div className={'donation__container'}>
                    <img src={cats} alt={'donation__container_cats'}/>
                </div>
                <div className={'donation__container_inner'}>
                    <h4>Зібрані кошти підуть на харчування та медичну допомогу</h4>
                    <div className="button-group">
                        <button
                            className={`custom-button left ${selectedOption === 'onetime' ? 'selected' : ''}`}
                            onClick={() => handleOptionSelect('onetime')}
                        >
                            Разово
                        </button>
                        <button
                            className={`custom-button right ${selectedOption === 'monthly' ? 'selected' : ''}`}
                            onClick={() => handleOptionSelect('monthly')}
                        >
                            Щомісячно
                        </button>
                    </div>
                    <DonateForm/>
                </div>
            </Modal>
        </div>

    );
};

export default ModalButton;
