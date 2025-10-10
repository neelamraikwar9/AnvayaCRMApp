import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://anvaya-model-references-apis-backen.vercel.app',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a response interceptor globally for the instance
axiosInstance.interceptors.response.use(
  response => {
    // Any 2xx status code triggers this
    return response;
  },
  error => {
    if (error.response && error.response.status === 500) {
      // Customize error handling for server errors here
      console.error('Server error 500:', error.response.data);
    }
    // Reject the error so your catch block can handle it
    return Promise.reject(error);
  }
);

export default axiosInstance;
