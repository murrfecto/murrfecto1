import * as yup from "yup";

const textRules = /[а-яієїґ\']+/ig;

export const feedbackSchema = yup.object().shape({
    name: yup.string().matches(textRules, {message: "Введіть українською мовою"}).max(30, "Не більше 30 знаків").required("Введіть ваше імʼя"),
    email: yup.string().email("Введіть дійсний email").required("Введіть email"),
    text: yup.string().matches(textRules, {message: "Введіть українською мовою"}).max(250).required("Поле обовʼязкове для заповнення"),
})