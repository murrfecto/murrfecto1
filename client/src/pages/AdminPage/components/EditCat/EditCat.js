import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {BiUpload} from "react-icons/bi";
import Spinner from "../../../../helpers/spinner/Spinner";
import {_ENDPOINT} from "../../../../variables/variables";
import {Field, Form, Formik} from "formik";
import {HandleAlerts, handleAlerts} from "../../../../helpers/formAlertHandler/formAlertHandler";
import {Alert, AlertTitle, Collapse} from "@mui/material";

const initialState = {
    name: '',
    images: [],
    description: '',
    chipped: '',
    age: '',
    gender: '',
};

const EditCat = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [formData, setFormData] = useState(initialState);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (id) {
            axios
                .get(`${_ENDPOINT}/cats/${id}`)
                .then((response) => {
                    const catData = response.data;
                    const images = catData.images || [];
                    setFormData({
                        name: catData.name || '',
                        images: [],
                        description: catData.description || '',
                        chipped: catData.chipped || '',
                        age: catData.age || '',
                        gender: catData.gender || '',
                    });
                    setFiles(images);

                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleSubmit = async (values, {setStatus, setSubmitting}) => {
        if (!values.images || values.images.length === 0) {
            setStatus({
                status: 'error',
                message: 'Будь ласка, додайте картинки',
            });
            return;
        }

        const data = new FormData();
        values.images.forEach((image) => {
            if (image instanceof File) {
                data.append('images', image);
            }
        });
        data.append('name', values.name);
        data.append('description', values.description);
        data.append('chipped', values.chipped);
        data.append('age', values.age);
        data.append('gender', values.gender);

        try {
            await axios.put(`${_ENDPOINT}/cats/${id}`, data);
            setStatus({status: 'success', message: 'Картка відредагована!'})
            setTimeout(() => {
                navigate('/admin/cats/ViewAllCats');
            }, 1000)
        } catch (error) {
            setStatus({
                status: 'error',
                message: 'Помилка створення картки, <br/> будь ласка, оберіть доступний формат <br/> P.S: Вага картинок не може перевищувати 1 мб',
            });
            console.error(error);
            setSubmitting(false);
        }
    };

    const handleCancel = (resetForm) => {
        resetForm();
        navigate('/admin/cats/ViewAllCats');
    };
    const handleFileUpload = (e, setFieldValue) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            setFieldValue('images', selectedFiles);
            setFiles(selectedFiles);
        }
    };

    return (
        <div>
            {loading ? (
                <Spinner/>
            ) : (
                <div className="formAdding">
                    <h2 className="formAdding__title">Редагування кота!</h2>
                    <Formik initialValues={formData} onSubmit={handleSubmit}>
                        {({isSubmitting, values, status, setFieldValue, resetForm}) => (
                            <Form>
                                <div className={'alerts'}>
                                    {HandleAlerts(status, values)}
                                </div>
                                <div className="formAdding__wrapper">
                                    <div className="formAdding__wrapper_leftSection">
                                        <div className="name">
                                            <label>Ім'я</label>
                                            <Field
                                                placeholder="Вкажіть ім’я кота"
                                                type="text"
                                                name="name"
                                                required
                                            />
                                        </div>
                                        <div className="photo">
                                            <label>Фото</label>
                                            <label
                                                className={`photo__selected ${values.images.length > 0 ? 'selected' : ''}`}
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
                                                required
                                                accept=".png, .jpeg, .jpg"
                                                onChange={(e) =>
                                                    handleFileUpload(e, setFieldValue)}
                                                className="input__file_none"
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
                                                    style={{
                                                        color:
                                                            formData.age ? 'black' : '#4f5a69',
                                                    }}
                                                >
                                                    <option
                                                        className="age__placeholder"
                                                        disabled
                                                        value=""
                                                    >
                                                        Вкажіть вік кота
                                                    </option>
                                                    <option value="до року">До року</option>
                                                    <option value="1 рік">1 рік</option>
                                                    {Array.from({length: 3}, (_, i) => i + 2).map(
                                                        (num) => (
                                                            <option
                                                                value={`${num} роки`}
                                                                key={num}
                                                                style={{
                                                                    color:
                                                                        formData.age ===
                                                                        `${num} роки`
                                                                            ? 'black'
                                                                            : '#4f5a69',
                                                                }}
                                                            >
                                                                {num} роки
                                                            </option>
                                                        )
                                                    )}
                                                    {Array.from({length: 13}, (_, i) => i + 5).map(
                                                        (num) => (
                                                            <option
                                                                value={`${num} років`}
                                                                key={num}
                                                                style={{
                                                                    color:
                                                                        formData.age ===
                                                                        `${num} років`
                                                                            ? 'black'
                                                                            : '#4f5a69',
                                                                }}
                                                            >
                                                                {num} років
                                                            </option>
                                                        )
                                                    )}
                                                </Field>
                                            </div>
                                            <div className="gender">
                                                <label>Стать</label>
                                                <Field
                                                    as="select"
                                                    name="gender"
                                                    required
                                                    style={{
                                                        color:
                                                            formData.gender ? 'black' : '#4f5a69',
                                                    }}
                                                >
                                                    <option
                                                        selected
                                                        value=""
                                                        disabled
                                                    >
                                                        Оберіть стать
                                                    </option>
                                                    <option value="кіт">Кіт</option>
                                                    <option value="кішка">Кішка</option>
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="chipped">
                                            <label>Наявність чипа</label>
                                            <Field
                                                as="select"
                                                name="chipped"
                                                required
                                                style={{
                                                    color:
                                                        formData.chipped ? 'black' : '#4f5a69',
                                                }}
                                            >
                                                <option disabled value="">
                                                    Вкажіть наявність чіпу
                                                </option>
                                                <option value="чипований">
                                                    чипований
                                                </option>
                                                <option value="чипована">
                                                    чипована
                                                </option>
                                                <option value="нечипований">
                                                    нечипований
                                                </option>
                                                <option value="нечипована">
                                                    нечипована
                                                </option>
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
                                    <button
                                        className="submit"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Добавити
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
            )}
        </div>
    );
};

export default EditCat;
