import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import MeetingHeader from "./MeetingHeader";
import TodoList from "./TodoList";
import MeetingContent from "./MeetingContent";
import { useNavigate, useParams } from "react-router-dom";

const MeetingDetail = () => {
  const { id } = useParams(); // URL에서 회의 id 추출
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 백엔드 API로부터 회의 데이터를 가져옵니다.
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
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Todo 항목의 체크박스 상태를 토글하고 업데이트 요청을 보냅니다.
  const handleCheckboxChange = (index) => {
    if (!meeting) return;
    const updatedTodos = meeting.todoList.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setMeeting({ ...meeting, todoList: updatedTodos });
    fetch(`http://localhost:8080/api/meetings/${id}/todos`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodos),
    }).catch((err) => console.error("업데이트 실패:", err));
  };

  // Todo 항목의 담당자 변경을 처리하고 업데이트 요청을 보냅니다.
  const handleParticipantChange = (index, newParticipant) => {
    if (!meeting) return;
    const updatedTodos = meeting.todoList.map((todo, i) =>
      i === index ? { ...todo, assignedTo: newParticipant } : todo
    );
    setMeeting({ ...meeting, todoList: updatedTodos });
    fetch(`http://localhost:8080/api/meetings/${id}/todos`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodos),
    }).catch((err) => console.error("업데이트 실패:", err));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        로딩 중...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        {error}
      </div>
    );
  if (!meeting)
    return (
      <div className="flex items-center justify-center h-screen">
        해당 회의를 찾을 수 없습니다.
      </div>
    );

  // 백엔드 데이터 형식에 맞춰 MeetingHeader에 전달할 데이터 구성
  const meetingHeaderData = {
    date: meeting.date,
    title: meeting.name || meeting.title,
    host: meeting.host,
    participants: meeting.participants.split(",").map((p) => p.trim()),
  };

  return (
    <div className="bg-white w-full min-h-screen px-10 pt-10">
      {/* 상단 로고 버튼 */}
      <Button onClick={() => navigate("/main")} className="font-semibold text-xl mb-5">
        WSC
      </Button>
      <div className="flex gap-12 items-start">
        <div className="flex-1 pr-8">
          {/* MeetingHeader에 백엔드 데이터를 전달 */}
          <MeetingHeader data={meetingHeaderData} />
          <div className="mt-10">
            <div className="bg-[#f9dada] w-fit px-4 py-1 text-[24px] font-bold rounded-full mb-4">
              TODO
            </div>
            {/* TodoList에 백엔드의 todo 데이터를 전달하고, 이벤트 핸들러도 함께 제공합니다 */}
            <TodoList
              todoItems={meeting.todoList}
              onCheckboxChange={handleCheckboxChange}
              onParticipantChange={handleParticipantChange}
              participants={meetingHeaderData.participants}
            />
          </div>
        </div>
        <div className="w-px bg-gray-300 h-[750px]" />
        <div className="flex-1 pl-5">
          {/* MeetingContent에 회의 내용을 전달 */}
          <MeetingContent content={<span className="text-base">{meeting.description}</span>} />
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
