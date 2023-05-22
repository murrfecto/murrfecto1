import React, {useState} from 'react';
import axios from 'axios';
import './AddCat.scss'
import {Alert} from "@mui/material";

const _ENDPOINT = "http://localhost:3000/cats";
const AddCat = () => {

    const initialState = {
        name: '',
        image: '',
        description: '',
        chipped: ''
    };

    const [formData, setFormData] = useState(initialState);
    const [files, setFiles] = useState([]);
    const [formStatus, setFormStatus] = useState('');

    const handleSubmit = async (e) => {
        const data = new FormData();
        files.forEach((file, index) => {
            data.append('image', file, `image${index}`); // Use unique filenames for each file
        });
        data.append('name', formData.name)
        data.append('description', formData.description)
        data.append('chipped', formData.chipped)
        e.preventDefault();
        axios.post(_ENDPOINT, data)
            .then(() => {
                setFormStatus('success');
                setFormData(initialState);
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
                <Alert className={'alert-success'} severity="success">Картка створена!</Alert>
            )}
            {formStatus === 'error' && (
                <Alert className={'alert-failure'} severity="error">Помилка створення картки. Будь ласка, виберіть .png,
                    .jpeg, .jpg формату картинки .</Alert>
            )}
            <form onSubmit={handleSubmit} className="formAdding">
                <h2 className='formAdding__title'>Додайте кота!</h2>
                <div className='formAdding__wrapper'>
                    <label>Ім'я</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required/>

                    <label>Фото</label>
                    <input type="file" multiple name="image" accept=".png, .jpeg, .jpg" onChange={handleFileUpload}
                           required/>

                    <label>Опис</label>
                    <input type="text" name="description" value={formData.description} onChange={handleInputChange}
                           required/>

                    <label htmlFor="Name">Наявність чіпу</label>
                    <input type="text" name="chipped" value={formData.chipped} onChange={handleInputChange} required/>

                    <button type="submit">Добавити</button>
                </div>
            </form>
        </div>
    );
};

export default AddCat;