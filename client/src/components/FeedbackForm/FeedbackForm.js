import React from "react";
import { Formik, Form, Field } from 'formik';

const FeedbackForm = () => {
    
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
        // onSubmit={onSubmit}
      >
         <Form>
            <label htmlFor="name">Імʼя</label>
            <Field type="text" name="name" id="name"/>
            <label htmlFor="email">Електронна адреса</label>
            <Field type="email" name="email" id="email"/>
            <label htmlFor="name">Повідомлення</label>
            <Field type="text" name="text" id="text"/>
           <button type="submit">Submit</button>
         </Form>
       </Formik>
     
     </div>   
    );
};

export default FeedbackForm;