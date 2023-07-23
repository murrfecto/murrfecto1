import * as yup from "yup";


const subscribeRules = /^[\w-]+(?:\.[\w-]+)*@(?!.*\.ru)(?:[\w-]+\.)+[a-zA-Z]{2,7}$/i;


export const subscribeSchema = yup.object().shape({
   
    email: yup.string().matches(subscribeRules, {message: "Введіть дійсний email"}).required("Введіть email"),
    
})