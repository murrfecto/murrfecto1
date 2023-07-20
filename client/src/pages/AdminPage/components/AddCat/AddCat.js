import React, {useState} from 'react';
import axios from 'axios';
import './AddCat.scss';
import {BiUpload} from "react-icons/bi";
import {_ENDPOINT} from "../../../../variables/variables";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Alert, AlertTitle} from "@mui/material";
import {redirect, useNavigate} from "react-router-dom";


const AddCat = () => {
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        images: [],
        description: '',
        chipped: '',
        age: '',
        gender: '',
    };

    const handleSubmit = async (values, {setSubmitting, setStatus}) => {
        try {
            const data = new FormData();
            if (!values.images) {
                return setStatus({status: "error", message: "Будь ласка, додайте картинки"})
            }
            values.images.forEach((file, index) => {
                data.append('images', file, `image${index}`);
            });
            data.append('name', values.name);
            data.append('description', values.description);
            data.append('chipped', values.chipped);
            data.append('age', values.age);
            data.append('gender', values.gender);

            const response = await axios.post(`${_ENDPOINT}/cats`, data);
            setStatus({status: 'success', message: 'Картка створена!'});
            setSubmitting(false);
        } catch (err) {
            console.error(err.message);
            setStatus({status: 'error', message: 'Error creating the cat card.'});
            setSubmitting(false);
        }
    };

    function handleAlerts(status, values) {
        if (status === 'success') {
            return (
                <Alert className={'alert-failure'} severity={'success'}>
                    Картка створена!
                </Alert>
            );
        } else if (status === 'error') {
            return (
                <Alert className={'alert-failure'} severity={'error'}>
                    Помилка створення картки, будь ласка оберіть доступний формат
                    P.S: Вага картинок не може перевищувати 1 мб
                </Alert>
            );
        } else if (values.images.length === 0) {
            return (
                <Alert className={'alert-failure'} severity={'error'}>
                    Будь ласка, додайте картинки
                </Alert>
            );
        }
        return null;
    }

    const handleCancel = (resetForm) => {
        resetForm();
        navigate('/admin/cats/ViewAllCats');
    };

    const handleFileUpload = (e, setFieldValue) => {
        const selectedFiles = Array.from(e.target.files).slice(0, 4); // Restrict to max 4 images
        setFieldValue('images', selectedFiles);
    };

    return (
        <div className={'formAdding'}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({isSubmitting, status, setFieldValue, values, resetForm}) => (
                    <Form>
                        <>
                            {handleAlerts(status, values)}
                        </>
                        <h2 className="formAdding__title">Додайте кота!</h2>
                        <div className="formAdding__wrapper">
                            <div className="formAdding__wrapper_leftSection">
                                <div className="name">
                                    <label>Ім'я</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Вкажіть ім’я кота"
                                        required
                                    />
                                </div>
                                <div className="photo">
                                    <label>Фото</label>
                                    <label className="photo__selected" htmlFor="fileInput">
                                        {values.images.length > 0 ? (
                                                <div>
                                                    <h4>Обрані фото:</h4>
                                                    <ul>
                                                        {values.images.map((file, index) => (
                                                            <li key={index}>{file.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) :
                                            (
                                                <>
                                                    <span>Оберіть фото</span>{' '}
                                                    <BiUpload size={22} color="black"/>
                                                </>
                                            )
                                        }
                                    </label>

                                    <input
                                        type="file"
                                        id="fileInput"
                                        multiple
                                        name="images"
                                        required
                                        onChange={(e) => handleFileUpload(e, setFieldValue)}
                                        className="input__file_none"
                                    />
                                    <ErrorMessage
                                        name="images"
                                        component="div"
                                        className="error"
                                    />
                                </div>
                            </div>

                            <div className="formAdding__wrapper_rightSection">
                                <div className="ageAndGender">
                                    <div className="age">
                                        <label>Вік кота:</label>
                                        <Field
                                            as="select"
                                            name="age"
                                            required
                                        >
                                            <option className="age__placeholder" disabled value="">Вкажіть вік кота
                                            </option>
                                            <option value="до року">До року</option>
                                            <option value="1 рік">1 рік</option>
                                            {Array.from({length: 3}, (_, i) => i + 2).map((num) => (
                                                <option value={`${num} роки`} key={num}>{num} роки</option>
                                            ))}
                                            {Array.from({length: 13}, (_, i) => i + 5).map((num) => (
                                                <option value={`${num} років`} key={num}>{num} років</option>
                                            ))}
                                        </Field>
                                    </div>
                                    <div className="gender">
                                        <label>Стать</label>
                                        <Field
                                            as="select"
                                            name="gender"
                                            required
                                        >
                                            <option selected value="" disabled>Оберіть стать</option>
                                            <option value="кіт">Кіт</option>
                                            <option value="кішка">Кішка</option>
                                        </Field>
                                    </div>
                                </div>
                                <div className="chipped">
                                    <label>Наявність чіпу</label>
                                    <Field as="select" name="chipped" required>
                                        <option disabled value="">Вкажіть наявність чіпу</option>
                                        <option value="чипований">чипований</option>
                                        <option value="не чипований">не чипований</option>
                                    </Field>
                                </div>
                                <div className="info">
                                    <label>Інформація</label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        placeholder="Введіть текст"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="btn-group">
                            <button className="submit" type="submit" disabled={isSubmitting}>
                                Додати
                            </button>
                            <button className="cancel" disabled={isSubmitting} onClick={() => handleCancel(resetForm)}>
                                Скасувати
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
        ;
};

export default AddCat;
