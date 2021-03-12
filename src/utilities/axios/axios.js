import axios from 'axios';
let BASE_URL = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	BASE_URL = 'http://localhost:5000';
} else {
	BASE_URL = 'https://simple-portal.herokuapp.com/';
}

export default axios.create({
	baseURL: BASE_URL,
});
