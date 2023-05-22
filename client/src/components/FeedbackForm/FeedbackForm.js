import React from "react";
import { Formik, Form, Field } from "formik";
import { feedbackSchema } from "./schema";
import axios from "axios";

import "./Feedbackform.scss";

const FeedbackForm = () => {
  const onSubmit = async (values, { resetForm }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    resetForm();
    console.log(values);
  };

  return (
    <div className="feedback_wrapper">
      <h3 className="feedback_title">Зворотній зв’язок</h3>
      <p className="feedback_text">
        Якщо у Вас є запитання або пропозиції, напишіть нам
      </p>

      <Formik
        initialValues={{
          name: "",
          email: "",
          text: "",
        }}
        validationSchema={feedbackSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="feedback_form" noValidate>
            <div className="input_wrapper">
              <label htmlFor="name" className="feedback_label">
                Імʼя
              </label>
              <Field
                className={
                  errors.name && touched.name ? "input_error" : "feedback_input"
                }
                type="text"
                name="name"
                id="name"
              />
              {errors.name && touched.name && (
                <p className="feedback_error">{errors.name}</p>
              )}
            </div>
            <div className="input_wrapper">
              <label htmlFor="email" className="feedback_label">
                Електронна адреса
              </label>
              <Field
                className={
                  errors.email && touched.email
                    ? "input_error"
                    : "feedback_input"
                }
                type="email"
                name="email"
                id="email"
              />
              {errors.email && touched.email && (
                <p className="feedback_error">{errors.email}</p>
              )}
            </div>
            <div className="input_wrapper">
              <label htmlFor="text" className="feedback_label">
                Повідомлення
              </label>
              <Field
                className={
                  errors.text && touched.text
                    ? "input_error"
                    : "feedback_textarea"
                }
                type="text"
                name="text"
                id="text"
                component="textarea"
              />
              {errors.text && touched.text && (
                <p className="feedback_error">{errors.text}</p>
              )}
            </div>
            <button className="feedback_button" type="submit">
              Надіслати
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FeedbackForm;
