import axios from 'axios';

const instanse = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json'
    }
});

instanse.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        if (error.response) {
            error = error.response.data.message;
        } else if (error.request) {
            // console.log(error.request);
        } else {
            // console.log('Error', error.message);
        }
        return Promise.reject(error);
    }
);

export default instanse;
