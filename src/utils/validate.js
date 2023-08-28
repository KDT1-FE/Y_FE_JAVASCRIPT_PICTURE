import { EMAIL_REGEX } from '../constants/regex';

export const validateEmail = (email) => {
  if (!EMAIL_REGEX.test(email)) {
    alert('이메일 형식을 지켜주세요!');
    return false;
  }
  return true;
};

export const existFile = (file) => {
  if (file.name === '') {
    alert('이미지를 첨부해주세요');
    return false;
  }
  return true;
};

export const existEmail = (email) => {
  if (email) return true;
  return false;
};
