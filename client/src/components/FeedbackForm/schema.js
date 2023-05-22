import * as yup from "yup";

const textRules = /[а-яієїґ\']+/ig;

export const feedbackSchema = yup.object().shape({
    name: yup.string().matches(textRules, {message: "Українською, будь ласка"}).max(30, "Не більше 30 знаків").required("Поле обовʼязкове"),
    email: yup.string().email("Введіть, будь ласка, дійсну електронну пошту").required("Поле обовʼязкове"),
    text: yup.string().matches(textRules, {message: "Українською, будь ласка"}).max(150).required("Поле обовʼязкове"),
})