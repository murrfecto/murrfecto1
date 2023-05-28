import React, {useState} from "react";
import {Formik, Form, Field} from "formik";
import {feedbackSchema} from "./schema";
import axios from "axios";

import "./Feedbackform.scss";
import ModalContacts from "../ModalContacts/ModalContacts";

const FeedbackForm = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    
    const onSubmit = async (values, {resetForm}) => {

        await new Promise((resolve) => setTimeout(resolve, 500));
        // try {
        //     await axios.post('http://localhost:3000/cats/send-message', values);
        //     resetForm();
        //     console.log('Message sent successfully');
        // } catch (error) {
        //     console.error('Error sending message:', error);
        // }
        resetForm();
        setModalOpen(true);
    };

    return (
        <div className="feedback_wrapper">
            <h3 className="feedback_title">Зворотний зв’язок</h3>
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
                {({errors, touched}) => (
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
                        <div className="textarea_wrapper">
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
                        {isModalOpen && <ModalContacts toggleModal = {setModalOpen}/>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FeedbackForm;
