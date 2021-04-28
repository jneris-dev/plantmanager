// json-server ./src/services/server.json --host 192.168.0.5 --port 3333

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/jneris-wd/plantmanager',
});

export default api;