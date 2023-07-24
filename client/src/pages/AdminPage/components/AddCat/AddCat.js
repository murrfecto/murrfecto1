import React, {useState} from 'react';
import axios from 'axios';
import './AddCat.scss';
import {BiUpload} from "react-icons/bi";
import {_ENDPOINT} from "../../../../variables/variables";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {HandleAlerts, handleAlerts} from "../../../../helpers/formAlertHandler/formAlertHandler";

const AddCat = () => {
    const navigate = useNavigate();
    const [selectedStyle, setSelectedStyle] = useState({
        age: '',
        gender: '',
        chipped: '',
    });


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

            await axios.post(`${_ENDPOINT}/cats`, data);
            setStatus({status: 'success', message: 'Картка створена!'});
            setSubmitting(false);
        } catch (err) {
            console.error(err.message);
            setStatus({status: 'error', message: 'Помилка створення картки.'});
            setSubmitting(false);
        }
    };



    const handleCancel = (resetForm) => {
        resetForm();
        navigate('/admin/cats/ViewAllCats');
    };

    const handleSelectChange = (field, e) => {
        setSelectedStyle((prevState) => ({
            ...prevState,
            [field]: e.target.value,
        }));
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
                        <div className={'alerts'}>
                            {HandleAlerts(status, values)}
                        </div>
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
                                    <label className={`photo__selected ${values.images.length > 0 ? 'selected' : ''}`}
                                           htmlFor="fileInput">
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
                                        accept=".png, .jpeg, .jpg"
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
                                            onChange={(e) => {
                                                handleSelectChange('age', e);
                                                setFieldValue('age', e.target.value);
                                            }}
                                            style={{color: selectedStyle.age ? 'black' : '#4f5a69'}}
                                        >
                                            <option className="age__placeholder" disabled value="">
                                                Вкажіть вік кота
                                            </option>
                                            <option value="до року">До року</option>
                                            <option value="1 рік">1 рік</option>
                                            {Array.from({length: 3}, (_, i) => i + 2).map((num) => (
                                                <option
                                                    value={`${num} роки`}
                                                    key={num}
                                                    style={{color: selectedStyle.age === `${num} роки` ? 'black' : '#4f5a69'}}
                                                >
                                                    {num} роки
                                                </option>
                                            ))}
                                            {Array.from({length: 13}, (_, i) => i + 5).map((num) => (
                                                <option
                                                    value={`${num} років`}
                                                    key={num}
                                                    style={{color: selectedStyle.age === `${num} років` ? 'black' : '#4f5a69'}}
                                                >
                                                    {num} років
                                                </option>
                                            ))}
                                        </Field>
                                    </div>
                                    <div className="gender">
                                        <label>Стать</label>
                                        <Field
                                            as="select"
                                            name="gender"
                                            required
                                            onChange={(e) => {
                                                handleSelectChange('gender', e);
                                                setFieldValue('gender', e.target.value);
                                            }}
                                            style={{color: selectedStyle.gender ? 'black' : '#4f5a69'}}
                                        >
                                            <option selected value="" disabled>
                                                Оберіть стать
                                            </option>
                                            <option value="кіт">Кіт</option>
                                            <option value="кішка">Кішка</option>
                                        </Field>
                                    </div>
                                </div>
                                <div className="chipped">
                                    <label>Наявність чіпу</label>
                                    <Field
                                        as="select"
                                        name="chipped"
                                        required
                                        onChange={(e) => {
                                            handleSelectChange('chipped', e);
                                            setFieldValue('chipped', e.target.value);
                                        }}
                                        style={{color: selectedStyle.chipped ? 'black' : '#4f5a69'}}
                                    >
                                        <option disabled value="">
                                            Вкажіть наявність чіпу
                                        </option>
                                        <option value="чипований">чипований</option>
                                        <option value="чипована">чипована</option>
                                        <option value="нечипований">нечипований</option>
                                        <option value="нечипована">нечипована</option>
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
                            <button
                                className="cancel"
                                disabled={isSubmitting}
                                onClick={() => handleCancel(resetForm)}
                            >
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
