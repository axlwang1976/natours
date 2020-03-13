/* eslint-disable */
import '@babel/polyfill';

import { login, logout } from './login';
import { displayMap } from './mapBox';
import { updateSetting } from './updateAccount';
import { bookTour } from './booking';

const loginForm = document.querySelector('.login-form form');
const mapbox = document.querySelector('#map');
const logoutBtn = document.querySelector('.nav__el--logout');
const settingForm = document.querySelector('.form-user-data');
const passwordForm = document.querySelector('.form-user-settings');
const bookingBtn = document.querySelector('#book-tour');

if (loginForm) {
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const credential = { email: email.value, password: password.value };
    login(credential);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (mapbox) {
  const locations = JSON.parse(mapbox.dataset.locations);
  displayMap(locations);
}

if (settingForm) {
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const photo = document.querySelector('#photo');
  settingForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name.value);
    form.append('email', email.value);
    form.append('photo', photo.files[0]);
    updateSetting(form, 'updateMe');
  });
}

if (passwordForm) {
  const oldPassword = document.querySelector('#password-current');
  const newPassword = document.querySelector('#password');
  const newPasswordConfirm = document.querySelector('#password-confirm');
  const passwords = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  };
  oldPassword.addEventListener(
    'change',
    e => (passwords.oldPassword = e.target.value)
  );
  newPassword.addEventListener(
    'change',
    e => (passwords.newPassword = e.target.value)
  );
  newPasswordConfirm.addEventListener(
    'change',
    e => (passwords.newPasswordConfirm = e.target.value)
  );
  passwordForm.addEventListener('submit', e => {
    e.preventDefault();
    updateSetting(passwords, 'updatePassword');
  });
}

if (bookingBtn) {
  bookingBtn.addEventListener('click', async e => {
    e.target.textContent = 'processing...';
    await bookTour(e.target.dataset.id);
  });
}
