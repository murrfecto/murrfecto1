import {useState} from "react";
import axios from 'axios';

function UseCustomAxios() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const get = async (url) => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setData(response.data);
            setError(null);

        } catch (error) {
            setError(error);
            setData(null);

        }
        setLoading(false);
    };
    return {data, error, loading, get};
}

export default UseCustomAxios;