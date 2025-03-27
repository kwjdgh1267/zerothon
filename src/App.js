import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import MeetingDetail from "./pages/MeetingDetail";  
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />  {/* /login 경로로 수정 */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Main />} /> {/* 메인 페이지 설정 */}
        <Route path="/meeting/:id" element={<MeetingDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
