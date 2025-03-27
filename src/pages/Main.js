import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Main() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/meetings") // 백엔드 API 호출
      .then((response) => response.json())
      .then((data) => setMeetings(data)) // 받아온 데이터를 상태로 저장
      .catch((error) => console.error("Error fetching meetings:", error));
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link to="/" style={styles.logo}>Your Logo</Link>
      </header>

      <div style={styles.meetingList}>
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <div key={meeting.id} style={styles.meetingItem}>
              <span style={styles.meetingDate}>{meeting.date}</span>
              <Link to={`/meeting/${meeting.id}`} style={styles.meetingName}>{meeting.name}</Link>
            </div>
          ))
        ) : (
          <p>회의가 없습니다.</p>
        )}
      </div>

      {/* ✅ Link를 사용하여 코드 입력 및 생성 페이지로 이동 */}
      <div style={styles.buttonContainer}>
        <Link to="/code-input" style={styles.button}>코드 입력하기</Link>
        <Link to="/code-generate" style={styles.button}>코드 생성하기</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    width: "100%",
    maxWidth: "400px",
    textAlign: "left",
    fontWeight: "bold",
    padding: "10px 0"
  },
  logo: {
    fontSize: "18px",
    color: "black",
    textDecoration: "none"
  },
  meetingList: {
    width: "100%",
    maxWidth: "400px",
    background: "white",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px"
  },
  meetingItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #ddd"
  },
  meetingDate: {
    fontWeight: "bold"
  },
  meetingName: {
    color: "black",
    textDecoration: "none",
    fontWeight: "bold"
  },
  buttonContainer: {
    display: "flex",
    gap: "10px"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#f8b9b9",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "black"
  }
};
