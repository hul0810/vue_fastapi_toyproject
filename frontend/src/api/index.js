import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.35.165:8000',
});

async function Login(userData) {
  try {
    const { data } = await instance.post('/auth/login', userData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function CheckUserExist(id) {
  try {
    const { status } = await instance.get(`/auth/${id}`);
    console.log(status);
    return status;
  } catch ({ response }) {
    console.log(response.status);
    return response.status;
  }
}

export { Login, CheckUserExist };
