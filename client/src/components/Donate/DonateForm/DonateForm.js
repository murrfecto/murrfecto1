import "./DonateForm.scss";

const DonateForm = ({ title }) => {
  return (
    <div className={"donate-slider_wrap"}>
      <h3 className={"donate-slider_title"}>{title}</h3>
      <form className={"donate-form"}>
        <div className={"donate-form_box"}>
          <div className={"donate-form_box-count"}>
            <input
              type="radio"
              name="donation_number"
              id="twenty"
              value="20"
              hidden
            />
            <label for="twenty" className={"donate-form_radio-label"}>
              <span className={"donate-form_number"}>20</span>
            </label>
          </div>
          <div className={"donate-form_box-count"}>
            <input
              type="radio"
              name="donation_number"
              id="fifty"
              value="50"
              hidden
            />
            <label for="fifty" className={"donate-form_radio-label"}>
              <span className={"donate-form_number"}>50</span>
            </label>
          </div>
          <div className={"donate-form_box-count"}>
            <input
              type="radio"
              name="donation_number"
              id="hundred"
              value="100"
              hidden
            />
            <label for="hundred" className={"donate-form_radio-label"}>
              <span className={"donate-form_number"}>100</span>
            </label>
          </div>
          <div className={"donate-form_box-count"}>
            <input
              type="radio"
              name="donation_number"
              id="two_hundred"
              value="200"
              hidden
            />
            <label for="two_hundred" className={"donate-form_radio-label"}>
              <span className={"donate-form_number"}>200</span>
            </label>
          </div>
          <div className={"donate-form_input-count"}>
            <input
              className={"donate-form_input-free"}
              type="number"
              name="donation_free"
              placeholder="Інша сума, UAH"
            />
          </div>
        </div>
        <div className={"donate-form_select"}>
          <label for="cats" className={"donate-form_select-label"}>
            Допомогти конкретному котику
          </label>
          <div className={"donate-form_select-box"}>
            <select name="cat" id="cats">
              <option value="0" selected hidden>
                Оберіть пухнастика
              </option>
              <option value="1">Черчіль</option>
              <option value="2">Зоя</option>
              <option value="3">Костик</option>
            </select>
          </div>
        </div>
        <div>
          <input
            className={"donate-form_btn"}
            type="button"
            value="Допомогти"
          />
        </div>
      </form>
    </div>
  );
};

export default DonateForm;
