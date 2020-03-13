/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alert';

export const login = async cred => {
  try {
    const res = await axios.post('/api/users/login', cred);

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in suuccessfully!');
      window.location.assign('/');
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios.get('/api/users/logout');

    if (res.data.status === 'success') {
      showAlert('success', 'Logged out successfully');
      window.location.assign('/');
    }
  } catch (error) {
    showAlert('error', 'Shmething went wrong. Try again.');
  }
};
