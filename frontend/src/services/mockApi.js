import axios from 'axios';

const mockApi = axios.create({
  baseURL: 'http://localhost:5001'
});


export default mockApi;