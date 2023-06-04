import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Alert} from "@mui/material";
import {BiUpload} from "react-icons/bi";
import Spinner from "../../../../helpers/Spinner/Spinner";

const _ENDPOINT = "http://localhost:3000/cats";

const EditCat = () => {
    const navigate = useNavigate()
    const {id} = useParams();

    const initialState = {
        name: '',
        image: [],
        description: '',
        chipped: '',
        age: '',
        gender: '',
    };

    const initialFilesState = [];
    const [formData, setFormData] = useState(initialState);
    const [files, setFiles] = useState(initialFilesState);
    const [formStatus, setFormStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            axios
                .get(`${_ENDPOINT}/${id}`)
                .then((response) => {
                    const catData = response.data;
                    setFormData({
                        name: catData.name || '',
                        image: catData.images || [],
                        description: catData.description || '',
                        chipped: catData.chipped || '',
                        age: catData.age || '',
                        gender: catData.gender || '',
                    });
                    setLoading(false);
                    console.log(catData.images)
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        if (files.length > 0) {
            data.append('image', files[0]);
        }
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('chipped', formData.chipped);
        data.append('age', formData.age);
        data.append('gender', formData.gender);

        try {
            await axios.put(`${_ENDPOINT}/${id}`, data);
            setFormStatus('success');
            if (formStatus === 'success') {
                navigate('/admin/cats/ViewAllCats');
            }
        } catch (error) {
            setFormStatus('error');
            console.error(error);
        }

    }, handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }, handleFileUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    }, handleCancelUpdate = () => {
        if (Object.values(formData).some((value) => value !== '')) {
            setFormData(initialState);
        } else {
            setFormData(initialState);
            navigate('/admin/cats/ViewAllCats');
        }
    }


    return (<div>
        {loading ? (
            <Spinner/>
        ) : (
            <div>
                {formStatus === 'success' && (
                    <Alert className={'alert-success'} severity="success">
                        Картка відредагована!
                    </Alert>
                )}
                {formStatus === 'error' && (
                    <Alert className={'alert-failure'} severity="error">
                        Помилка редагування картки. Будь ласка, виберіть .png, .jpeg, .jpg формату картинки .
                    </Alert>
                )}
                <h2 className="formAdding__title">Редагування кота!</h2>
                <form onSubmit={handleSubmit} className="formAdding">
                    <div className="formAdding__wrapper">
                        <div className="formAdding__wrapper_leftSection">
                            <div className="name">
                                <label>Ім'я</label>
                                <input placeholder="Вкажіть ім’я кота" type="text"
                                       name="name" value={formData.name}
                                       onChange={handleInputChange} required/>
                            </div>
                            <div className="photo">
                                <label>Фото</label>
                                <label className="photo__selected"
                                       htmlFor="fileInput">{files.length > 0 ? (<div>
                                    <h4>Обрані фото:</h4>

                                    <ul>
                                        {files.map((file, index) => (<li key={index}>{file.name}</li>))}
                                    </ul>
                                </div>) : (<><span>Оберіть фото</span> <BiUpload size={22} color="black"/></>)}
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    multiple
                                    name="image"
                                    accept=".png, .jpeg, .jpg"
                                    onChange={handleFileUpload}
                                    required
                                    className="input__file_none"
                                />
                            </div>

                        </div>
                        <div className="formAdding__wrapper_rightSection">
                            <div className="ageAndGender">
                                <div className="age">
                                    <label>Вік кота:</label>
                                    <select name="age" value={formData.age}
                                            onChange={handleInputChange}>
                                        <option className="age__placeholder"
                                                disabled value="">Вкажіть вік кота
                                        </option>
                                        <option value="до року">До року</option>
                                        <option value="1 рік">1 рік</option>
                                        {Array.from({length: 3}, (_, i) => i + 2).map((num) => (
                                            <option value={`${num} роки`} key={num}>{num} роки</option>))}
                                        {Array.from({length: 13}, (_, i) => i + 5).map((num) => (
                                            <option value={`${num} років`} key={num}>{num} років</option>))}
                                    </select>
                                </div>
                                <div className="gender">
                                    <label>Стать</label>
                                    <select name="gender" value={formData.gender}
                                            onChange={handleInputChange} required>
                                        <option selected value="" disabled>Оберіть
                                            стать
                                        </option>
                                        <option value="кіт">Кіт</option>
                                        <option value="кішка">Кішка</option>
                                    </select>
                                </div>
                            </div>
                            <div className="chipped">
                                <label>Наявність чіпу</label>
                                <select name="chipped" value={formData.chipped}
                                        onChange={handleInputChange} required>
                                    <option disabled value="">Вкажіть наявність
                                        чіпу
                                    </option>
                                    <option value="чипований">чипований</option>
                                    <option value="не чипований">не чипований</option>
                                </select>
                            </div>
                            <div className="info">
                                <label>Інформація</label>
                                <textarea name="description"
                                          placeholder="Введіть текст"
                                          value={formData.description}
                                          onChange={handleInputChange}
                                          required/>
                            </div>
                        </div>
                    </div>
                    <div className="btn-group">
                        <button className="submit" type="submit">Добавити</button>
                        <button onClick={handleCancelUpdate} className="cancel">Скасувати</button>
                    </div>
                </form>
            </div>
        )}
    </div>);
};

export default EditCat;
