import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OnMeeting from './components/OnMeeting';
import CodeInput from "./components/CodeInput";
import CodeCreate from "./components/CodeCreate";
import MeetingDetail from "./components/MeetingDetail";
import Login from './components/Login'; // Login 컴포넌트 import
import SignUp from './components/SignUp';
import Main from "./components/Main";

import './App.css'; // Tailwind를 적용하기 위해 유지

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/meetingdetail" element={<MeetingDetail />} />  
        <Route path="/onmeeting" element={<OnMeeting />} />  
        <Route path="/code-create" element={<CodeCreate />} />
        <Route path="/code-input" element={<CodeInput />} />

        <Route path="/main" element={<Main />} /> 
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;