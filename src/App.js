import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import MeetingDetail from "./pages/MeetingDetail";  // MeetingDetail.js 가져오기

function App() {
  return (
    <Router> {/* App.js에서 Router만 한 번 감쌈 */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/meeting/:id" element={<MeetingDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
