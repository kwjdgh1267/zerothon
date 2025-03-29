// src/api/auth.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/', // 백엔드 주소에 맞게 수정
  withCredentials: true, // 세션 기반이면 추가
});

export const signup = (data) => API.post('/sign-up', data);
export const login = (data) => API.post('/sign-in', data);
