/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alert';

export const updateSetting = async (data, type) => {
  try {
    const res = await axios.patch(`/api/users/${type}`, data);

    if (res.data.status === 'success') {
      showAlert('success', 'User setting updated.');
      window.location.reload(true);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
