import React from "react";
import Modal from "react-modal";
import "./ModalButton.scss";
import cats from "../../assets/modal/donate_cats.png";
import DonateForm from "../Donate/DonateForm/DonateForm";
import {TfiClose} from "react-icons/tfi";
import {useDispatch, useSelector} from "react-redux";
import {closeModal, openModal} from "../../store/modalSlice";
import {motion} from "framer-motion";

const ModalButton = ({title, style}) => {
    const isOpen = useSelector(state => state.modal.isOpen);
    const dispatch = useDispatch();

    const handleOpenModal = (selectedOption) => {
        dispatch(openModal(selectedOption)); // Виклик диспетчера для відкриття
        // модального вікна
    };
    const handleCloseModal = () => {
        dispatch(closeModal()); // Диспетчер closeModal
    };



    const modalVariant = {
        initial: {
            opacity: 0,
            y: 50,
            transition: {
                type: 'spring',
                duration: .5,
                mass: 2,
                damping: 10,
                delay: .4
            }
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                duration: .5,
                mass: 2,
                damping: 10,
                delay: .2
            }
        },
    }
    return (
        <div id={"donation"}>
            <a className={`navbar_links ${style}`}
               onClick={()=>handleOpenModal('onetime')}>
                {title}
            </a>

                <Modal
                    style={{
                        overlay: {
                            zIndex: 999,
                            backgroundColor: "rgba(208, 190, 196, 0.8)",
                            overflow: "auto",
                        },
                        content: {
                            zIndex: 999,
                            outline: "none",
                        },
                    }}
                    closeTimeoutMS={800}
                    className={"modal"}
                    isOpen={isOpen}
                    aria-label="Donate to feed a cat"
                    onRequestClose={() => {
                        handleCloseModal();
                    }}
                    shouldCloseOnOverlayClick={true}
                >
                    <motion.div
                        className="box"
                        variants={modalVariant}
                        initial='initial'
                        animate='animate'
                        exit='initial'

                    >
                    <div className={"donation__container"}>
                        <img src={cats} alt={"donation__container_cats"}/>
                    </div>
                    <div className={"donation__container_inner"}>
                        <TfiClose
                            className={"donation__container_inner-close"}
                            color="#4B3542"
                            onClick={handleCloseModal}
                        />
                        <DonateForm
                            optionIdPrefix="modal"
                            title="Зібрані кошти підуть на харчування та медичну допомогу"
                            hasDonateTypeButtons
                        />
                    </div>
                    </motion.div>
                </Modal>


        </div>
    );
};

export default ModalButton;
