import "./DonateForm.scss";
import FormSelect from "../FormSelect/FormSelect";
import axios from "axios";

const DonateForm = ({title}) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/payment', {

            });
            window.location.replace(response.data.checkoutUrl);
        } catch (error) {
            console.error('An error occurred while processing the payment', error);
        }
    };


    return (<div className={"donate-slider_wrap"}>
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
                    <label htmlFor="twenty" className={"donate-form_radio-label"}>
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
                    <label htmlFor="fifty" className={"donate-form_radio-label"}>
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
                    <label htmlFor="hundred" className={"donate-form_radio-label"}>
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
                    <label htmlFor="two_hundred" className={"donate-form_radio-label"}>
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
            <FormSelect/>
            <div>
                <input
                    className={"donate-form_btn"}
                    type="button"
                    value="Допомогти"
                    onClick={handleSubmit}
                />
            </div>
        </form>
    </div>);
};

export default DonateForm;
