import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:3333',
});

//fazendo isso os outros arquivos poderam importar esse arquivo
export default api;