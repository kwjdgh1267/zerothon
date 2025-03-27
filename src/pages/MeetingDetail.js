import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MeetingDetail() {
  const { id } = useParams(); // URL에서 id 파라미터 추출
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/meetings/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("회의 정보를 불러올 수 없습니다.");
        }
        return response.json();
      })
      .then((data) => {
        setMeeting(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleCheckboxChange = (index) => {
    if (!meeting) return;

    // 변경된 상태를 새 배열로 생성
    const updatedTodos = meeting.todoList.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );

    // 상태 업데이트
    setMeeting({ ...meeting, todoList: updatedTodos });

    // 백엔드 업데이트 요청
    fetch(`http://localhost:8080/api/meetings/${id}/todos`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodos),
    }).catch((error) => console.error("업데이트 실패:", error));
  };

  const handleParticipantChange = (index, newParticipant) => {
    if (!meeting) return;

    // 변경된 담당자 적용
    const updatedTodos = meeting.todoList.map((todo, i) =>
      i === index ? { ...todo, assignedTo: newParticipant } : todo
    );

    setMeeting({ ...meeting, todoList: updatedTodos });

    // 백엔드 업데이트 요청
    fetch(`http://localhost:8080/api/meetings/${id}/todos`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodos),
    }).catch((error) => console.error("업데이트 실패:", error));
  };

  if (loading) return <div style={styles.content}>로딩 중...</div>;
  if (error) return <div style={styles.content}>{error}</div>;
  if (!meeting) return <div style={styles.content}>해당 회의를 찾을 수 없습니다.</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link to="/" style={styles.logo}>Your Logo</Link>
      </header>

      <div style={styles.meetingWrapper}>
        <div style={styles.meetingInfo}>
          <span style={styles.meetingDate}>{meeting.date}</span>
          <h1 style={styles.meetingName}>{meeting.name}</h1>

          <div style={styles.participantsWrapper}>
            <span style={styles.hostBadge}>Host</span>
            <span style={styles.host}>{" "+meeting.host || "정보 없음"}</span>
          </div>

          <div style={styles.participantsWrapper}>
            <span style={styles.participantBadge}>Participants</span>
            {meeting.participants
              ? meeting.participants.split(",").map((participant, index) => (
                  <span key={index} style={styles.participant}>{" "+participant.trim()}</span>
                ))
              : "정보 없음"}
          </div>

          <div style={styles.todoSection}>
            <h3 style={styles.todoTitle}>TODO</h3>
            <ul style={styles.todoList}>
              {meeting.todoList && meeting.todoList.length > 0 ? (
                meeting.todoList.map((todo, index) => (
                  <li key={index} style={styles.todoItem}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <span style={styles.todoText}>{todo.text}</span>

                    <select
                      value={todo.assignedTo || ""}
                      onChange={(e) => handleParticipantChange(index, e.target.value)}
                      style={styles.selectBox}
                    >
                      <option value="">담당자 없음</option>
                      {meeting.participants.split(",").map((participant, i) => (
                        <option key={i} value={participant.trim()}>
                          {participant.trim()}
                        </option>
                      ))}
                    </select>
                  </li>
                ))
              ) : (
                <li style={styles.todoItem}>할 일이 없습니다.</li>
              )}
            </ul>
          </div>
        </div>

        <div style={styles.meetingContent}>
          <h2 style={styles.contentTitle}>회의 내용</h2>
          <p>{meeting.description || "내용이 없습니다."}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif"
  },
  meetingWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px"
  },
  meetingInfo: {
    width: "40%",
    padding: "20px",
    borderRight: "2px solid #ddd"
  },
  todoSection: {
    marginTop: "20px"
  },
  todoTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  todoList: {
    listStyle: "none",
    padding: 0
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    marginBottom: "5px"
  },
  todoText: {
    marginLeft: "10px",
    marginRight: "10px"
  },
  selectBox: {
    marginLeft: "10px",
    padding: "5px",
    fontSize: "14px"
  },
  meetingContent: {
    width: "55%",
    padding: "20px"
  },
  contentTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px"
  }
};
