import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OnMeeting from './components/OnMeeting';
import CodeInput from "./components/CodeInput";
import CodeCreate from "./components/CodeCreate";
//import MeetingDetail from "./components/MeetingDetail";
import Login from './components/Login'; // Login 컴포넌트 import
import Main from "./pages/Main";
import MeetingDetail from "./pages/MeetingDetail";  
import SignUp from './components/SignUp';
//import Main from "./components/Main";

import './App.css'; // Tailwind를 적용하기 위해 유지

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/meetingdetail" element={<MeetingDetail />} />  
        <Route path="/onmeeting" element={<OnMeeting />} />  
        <Route path="/code-create" element={<CodeCreate />} />
        <Route path="/code-input" element={<CodeInput />} />

        <Route path="/main" element={<Main />} /> 
        <Route path="/login" element={<Login />} />  {/* /login 경로로 수정 */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/meeting/:id" element={<MeetingDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
