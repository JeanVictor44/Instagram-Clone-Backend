import axios from 'axios';

export const AbstractAPI = axios.create({
  baseURL:'https://emailvalidation.abstractapi.com/v1/'
});