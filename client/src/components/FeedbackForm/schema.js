import * as yup from "yup";

const textRules = /^[А-ЩЬЮЯЇІЄҐа-щьюяїієґ'ʼ\s]+$/ig;
const messageTextRules = /^[А-ЩЬЮЯЇІЄҐа-щьюяїієґ0-9'ʼ.,?!-\s]+$/ig;
const emailRules = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@(?!.*.ru$)[A-Za-z0-9.-]+$/gm;


export const feedbackSchema = yup.object().shape({
    name: yup.string().matches(textRules, {message: "Введіть українською мовою"}).max(30, "Не більше 30 знаків").required("Введіть ваше імʼя"),
    email: yup.string().matches(emailRules, {message: "Введіть дійсний email"}).required("Введіть email"),
    text: yup.string().matches(messageTextRules, {message: "Введіть українською мовою"}).max(150, "Не більше 30 знаків").required("Поле обовʼязкове для заповнення"),
})