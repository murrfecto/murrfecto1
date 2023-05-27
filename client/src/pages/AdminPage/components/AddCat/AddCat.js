import React, {useState} from 'react';
import axios from 'axios';
import './AddCat.scss';
import {Alert} from "@mui/material";

const _ENDPOINT = "http://localhost:3000/cats";
const AddCat = () => {

    const initialState = {
        name: '',
        image: '',
        description: '',
        chipped: '',
        age: '',
        gender: '',
    };

    const initialFilesState =[]

    const [formData, setFormData] = useState(initialState);
    const [files, setFiles] = useState(initialFilesState);
    const [formStatus, setFormStatus] = useState('');


    const handleSubmit = async (e) => {
        const data = new FormData();
        files.forEach((file, index) => {
            data.append('image', file, `image${index}`); // Use unique filenames for each file
        });
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('chipped', formData.chipped);
        data.append('age', formData.age);
        data.append('gender', formData.gender);
        e.preventDefault();
        axios.post(_ENDPOINT, data)
            .then(() => {
                setFormStatus('success');
                setFormData(initialState);
                setFiles(initialFilesState)
            })
            .catch(err => {
                setFormStatus('error');
                console.error(err);
            });
    };
    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };


    const handleFileUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };

    return (
        <div>
            {formStatus === 'success' && (
                <Alert className={'alert-success'} severity="success">Картка
                    створена!</Alert>
            )}
            {formStatus === 'error' && (
                <Alert className={'alert-failure'} severity="error">Помилка
                    створення картки. Будь ласка, виберіть .png,
                    .jpeg, .jpg формату картинки .</Alert>
            )}
            <form onSubmit={handleSubmit} className="formAdding">
                <h2 className="formAdding__title">Додайте кота!</h2>
                <div className="formAdding__wrapper">
                    <label>Ім'я</label>
                    <input type="text" name="name" value={formData.name}
                           onChange={handleInputChange} required/>

                    <label>Вік кота:</label>
                    <select name="age" value={formData.age}
                            onChange={handleInputChange}>
                        <option disabled value="">Вкажіть вік</option>
                        <option value="до року">До року</option>
                        <option value="1 рік">1 рік</option>
                        {Array.from({length: 3}, (_, i) => i + 2).map((num) => (
                            <option value={`${num} роки}`} key={num}>{num} роки</option>
                        ))}
                        {Array.from({length: 13}, (_, i) => i + 5).map((num) => (
                            <option value={`${num} років`} key={num}>{num} років</option>
                        ))}
                    </select>
                    <label>Стать</label>
                    <select name="gender" value={formData.gender}
                            onChange={handleInputChange} required>
                        <option value='' disabled >Оберіть стать</option>
                        <option value="кіт">Кіт</option>
                        <option value="кішка">Кішка</option>
                    </select>
                    <label>Фото</label>
                    <div>
                        <label className="input__file"
                               htmlFor="fileInput">{files.length > 0 ? (
                                <div className="input__file_selected">
                                    <h4>Вибрані фото:</h4>
                                    <ul>
                                        {files.map((file, index) => (
                                            <li key={index}>{file.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) :
                            'Виберіть фото'}</label>
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
                    <label>Наявність чіпу</label>
                    <select name="chipped" value={formData.chipped}
                            onChange={handleInputChange} required>
                        <option disabled value="">Вкажіть наявність чіпу</option>
                        <option value="є">чипований</option>
                        <option value="немає">не чипований</option>
                    </select>

                    <label>Опис</label>
                    <input type="text" name="description"
                           value={formData.description}
                           onChange={handleInputChange}
                           required/>

                    <button type="submit">Добавити</button>
                </div>
            </form>
        </div>
    );
};

export default AddCat;