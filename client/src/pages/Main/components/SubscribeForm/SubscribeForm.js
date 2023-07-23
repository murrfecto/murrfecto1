import React, {useState} from "react";
import { Formik, Form, Field } from "formik";
import "./SubscribeForm.scss";
import axios from "axios";
import { _ENDPOINT } from "../../../../variables/variables";
import { subscribeSchema } from "./schema";


const SubscribeForm = () => {
  const onSubmit = async (values, { resetForm }) => {
    try {
    await axios.post(`${_ENDPOINT}/cats/subscribe`, values);
     resetForm(); 
      console.log("Message sent successfully", values);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    resetForm();
  };

  return (
    <div className={"subscribe_form"}>
      <h3 className={"subscribe_form-header"}>
        Стежте за останніми подіями притулку
      </h3>
      <p className={"subscribe_form-text"}>
        Залиште свій email, і ми вам надішлемо новини про життя притулку
      </p>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={subscribeSchema}
        onSubmit={onSubmit}
      >

        {({ errors, touched }) => (
          <Form id={"data-form"} className={"subscribe_form-form"} noValidate>
            
              
             <div className={"subscribe_form-wrapper"}>
              <Field
                className={errors.email && touched.email ? "email_error" : "subscribe_form-input"}
                name="email"
                placeholder="Ваш email"
                type="email"
              />
        
              <button
                id={"data-form-btn"}
                type="submit"
                className={"subscribe_form-button"}
              >
                Надіслати
              </button>

            </div>
            {errors.email && touched.email && (
                <p className="text_error">{errors.email}</p>
                )}
           
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SubscribeForm;
