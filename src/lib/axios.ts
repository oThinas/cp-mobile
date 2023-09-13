import axios from 'axios';

export const api = axios.create({ baseURL: 'http://ip:port/' }); // coloca seu ip e porta
