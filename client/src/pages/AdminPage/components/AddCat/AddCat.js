    import React, {useState} from 'react';
    import axios from 'axios';
    import './AddCat.scss';
    import {Alert} from "@mui/material";
    import {BiUpload} from "react-icons/bi";
    import {_ENDPOINT} from "../../../../variables/variables";

    const AddCat = () => {
        const initialState = {
            name: '',
            images: '',
            description: '',
            chipped: '',
            age: '',
            gender: '',
        };

        const initialFilesState = [];
        const [formData, setFormData] = useState(initialState);
        const [files, setFiles] = useState(initialFilesState);
        const [formStatus, setFormStatus] = useState('');
        console.log(formData);

        const handleSubmit = async (e) => {
            e.preventDefault();

            const data = new FormData();
            files.forEach((file, index) => {
                data.append("images", file, `image${index}`);
            });
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("chipped", formData.chipped);
            data.append("age", formData.age);
            data.append("gender", formData.gender);

            try {
                const response = await axios.post(`${_ENDPOINT}/cats`, data);
                setFormStatus("success");
                setFormData(initialState);
                setFiles(initialFilesState);
            } catch (err) {
                console.error(err.message);
                setFormStatus("error");
            }
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
                    <Alert className={'alert-success'} severity="success">
                        Картка створена!
                    </Alert>
                )}
                {formStatus === 'error' && (
                    <Alert className={'alert-failure'} severity="error">
                        Помилка створення картки. <br/>
                        Вибраний невірний формат або вага картинки. <br/>
                        Доступні формати: .png, .svg, .jpeg, .jpg, .webp,
                    </Alert>
                )}
                <h2 className="formAdding__title">Додайте кота!</h2>
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
                                       htmlFor="fileInput">{files.length > 0 ? (
                                    <div>
                                        <h4>Обрані фото:</h4>
                                        <ul>
                                            {files.map((file, index) => (
                                                <li key={index}>{file.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (<><span>Оберіть фото</span> <BiUpload size={22} color="black"/></>)
                                }
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    multiple
                                    name="images"
                                    onChange={handleFileUpload}
                                    className="input__file_none"
                                />
                            </div>

                        </div>
                        <div className="formAdding__wrapper_rightSection">
                            <div className="ageAndGender">
                                <div className="age">
                                    <label>Вік кота:</label>
                                    <select name="age" value={formData.age}
                                            onChange={handleInputChange} required>
                                        <option className="age__placeholder"
                                                disabled value="">Вкажіть вік кота
                                        </option>
                                        <option value="до року">До року</option>
                                        <option value="1 рік">1 рік</option>
                                        {Array.from({length: 3}, (_, i) => i + 2).map((num) => (
                                            <option value={`${num} роки`} key={num}>{num} роки</option>
                                        ))}
                                        {Array.from({length: 13}, (_, i) => i + 5).map((num) => (
                                            <option value={`${num} років`} key={num}>{num} років</option>
                                        ))}
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
                        <button className="submit" type="submit">Додати</button>
                        <button onClick={() => setFormData(initialState)} className="cancel">Скасувати</button>
                    </div>
                </form>
            </div>
        );
    };

    export default AddCat;
