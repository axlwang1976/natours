/* eslint-disable */
import axios from 'axios';

import showAlert from './alert';

const stripe = Stripe('pk_test_fLShGAvyz6OlHZjtpo2UpwzO00CHiIKGjg');

export const bookTour = async tourId => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/bookings/checkout-session/${tourId}`
    );

    const { session } = res.data;

    await stripe.redirectToCheckout({ sessionId: session.id });
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
