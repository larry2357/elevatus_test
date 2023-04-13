import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_HOST + '/',
    headers: {
        'accept-account': '961c06eb-7e25-406c-87d5-d0742e09d96c',
        'accept-company': '900a776e-a060-422e-a5e3-979ef669f16b'
    }
});

export default instance;