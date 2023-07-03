import React, { useState } from "react";
import Modal from "react-modal";
import "./ModalButton.scss";
import cats from "../../assets/modal/donate_cats.png";
import DonateForm from "../Donate/DonateForm/DonateForm";
import { TfiClose } from "react-icons/tfi";

const ModalButton = ({ title, style }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDonationClick = () => {
    setModalIsOpen(true);
  };
  return (
    <div id={"donation"}>
      <a className={`navbar_links ${style}`} onClick={handleDonationClick}>
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
        className={"modal"}
        isOpen={modalIsOpen}
        aria-label="Donate to feed a cat"
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        shouldCloseOnOverlayClick={true}
      >
        <div className={"donation__container"}>
          <img src={cats} alt={"donation__container_cats"} />
        </div>
        <div className={"donation__container_inner"}>
          <TfiClose
            className={"donation__container_inner-close"}
            color="#4B3542"
            onClick={() => setModalIsOpen(false)}
          />
          <DonateForm
            optionIdPrefix="modal"
            title="Зібрані кошти підуть на харчування та медичну допомогу"
            hasDonateTypeButtons
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalButton;
