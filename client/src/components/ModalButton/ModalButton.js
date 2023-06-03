import React, { useState } from "react";
import Modal from "react-modal";
import "./ModalButton.scss";
import cats from "../../assets/modal/donate_cats.png";
import DonateForm from "../Donate/DonateForm/DonateForm";

const ModalButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDonationClick = () => {
    setModalIsOpen(true);
  };
  return (
    <div id={"donation"}>
      <a
        className={"navbar_links footer_donation "}
        onClick={handleDonationClick}
      >
        Нагодуй кота
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
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className={"donation__container"}>
          <img src={cats} alt={"donation__container_cats"} />
        </div>
        <div className={"donation__container_inner"}>
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
