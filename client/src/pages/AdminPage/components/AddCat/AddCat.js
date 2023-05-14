import React, {useState} from 'react';
import axios from 'axios';

const _ENDPOINT = "http://localhost:3000/cats";
const AddCat = () => {

    const initialState = {
        name: '',
        image: '',
        description: '',
        chipped: ''
    };

    const [formData, setFormData] = useState(initialState);

    const [formStatus, setFormStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(_ENDPOINT, formData)
            .then(response => {
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

    const handleImageChange = (e) => {
        setFormData({...formData, image: e.target.files[0]});
    };

    return (
        <div>
            <form action={_ENDPOINT} onSubmit={handleSubmit}>
                <h2>Добавити кота</h2>
                <div>
                    <label>
                        Ім'я
                    </label>
                    <input type="text"
                           name='name'
                           value={formData.name}
                           onChange={handleInputChange}
                           required
                    />

                    <label>
                        Фото
                    </label>
                    <input type="file"
                           name='image'
                           onChange={handleImageChange}
                           required
                    />

                    <label>
                        Опис
                    </label>
                    <input type="text"
                           name='description'
                           value={formData.description}
                           onChange={handleInputChange}
                           required
                    />


                    <label htmlFor="Name">
                        Наявність чіпу
                    </label>
                    <input type="text"
                           name='chipped'
                           value={formData.chipped}
                           onChange={handleInputChange}
                           required
                    />
                    <button type='submit'>Добавити</button>
                </div>
            </form>
        </div>

    );
};

export default AddCat;