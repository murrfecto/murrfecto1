import React from "react";
import { Formik, Form, Field } from 'formik';
import "./Feedbackform.scss"

const FeedbackForm = () => {
    
    const onSubmit = (values) => {
        console.log(values);
    }
    return (
     <div className="feedback_wrapper">
         <h3 className="feedback_title">Зворотній зв’язок</h3>
         <p className="feedback_text">Якщо у Вас є запитання або пропозиції, напишіть нам</p>
         
         
         <Formik
        initialValues={{
          name: '',
          email: '',
          text: '',
        }}
        onSubmit = {onSubmit}
        
      >
         <Form className="feedback_form">
            <div className="input_wrapper">
            <label htmlFor="name" className="feedback_label">Імʼя</label>
            <Field className="feedback_input" type="text" name="name" id="name"/>
            </div>
            <div className="input_wrapper">
            <label htmlFor="email" className="feedback_label">Електронна адреса</label>
            <Field className="feedback_input" type="email" name="email" id="email"/>
            </div>
            <div className="input_wrapper">
            <label htmlFor="text" className="feedback_label">Повідомлення</label>
            <Field className="feedback_textarea" type="text" name="text" id="text" component="textarea"/>
           </div>
           <button className="feedback_button"type="submit">Надіслати</button>
         </Form>
       </Formik>
     
     </div>   
    );
};

export default FeedbackForm;