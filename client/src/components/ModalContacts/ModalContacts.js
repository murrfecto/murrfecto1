import React from "react";
import closeBtn from "../../assets/modal-close.svg";
import "./ModalContacts.scss";

const ModalContacts = ({ toggleModal }) => {
  return (
    <div className="modal_backdrop">
      <div className="modal_container">
        <button type ="button" className="modal_btn_close" onClick={() => toggleModal()}>
          <img className='modal_icon' src={closeBtn} alt="закриваюча кнопка" width={24} height={24} />
        </button>
        <h3 className="modal_title">Дякуємо!</h3>
        <p className="modal_text">
          Ваша допомога дуже важлива для наших хвостиків.
        </p>
      </div>
    </div>
  );
};

export default ModalContacts;