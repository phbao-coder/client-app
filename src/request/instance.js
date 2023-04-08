import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
});

export default instance;
