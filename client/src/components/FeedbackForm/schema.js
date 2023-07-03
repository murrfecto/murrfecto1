import * as yup from "yup";

const textRules = /^[А-ЩЬЮЯЇІЄҐа-щьюяїієґ'ʼ\s\-]+$/gm;
const messageTextRules = /^[А-ЩЬЮЯЇІЄҐа-щьюяїієґ0-9'ʼ()".,?!_%\+\-\s]+$/gm;
const emailRules = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@(?!.*\.ru$)[a-z]+\.[A-Za-z0-9.-]+$/gm;


export const feedbackSchema = yup.object().shape({
    name: yup.string().matches(textRules, {message: "Введіть українською мовою"}).max(30, "Не більше 30 знаків").required("Введіть ваше імʼя"),
    email: yup.string().matches(emailRules, {message: "Введіть дійсний email"}).required("Введіть email"),
    text: yup.string().matches(messageTextRules, {message: "Введіть українською мовою"}).max(300, "Не більше 300 знаків").required("Поле обовʼязкове для заповнення"),
})