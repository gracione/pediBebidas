import axios from 'axios';

const api = axios.create({
  baseURL: "http://10.0.2.2:3333/",
})

//const token = localStorage.getItem('token');

//console.log(token);
//if (token) {
//  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//}

export default api;
