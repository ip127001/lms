import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
}); 

// instance.defaults.headers.common['Content-Type'] = 'application/json';

// instance.interceptors.request.use(request => {
//     console.log(request);
//     return request;
// }, error => {
//     console.log(error);
// })

// instance.interceptors.response.use(response => {
//     console.log(response);
//     return response;
// }, error => {
//     console.log(error);
// })
export default instance;