import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import MeetingHeader from "./MeetingHeader";
import TodoList from "./TodoList";
import MeetingContent from "./MeetingContent";
import { useNavigate, useLocation } from "react-router-dom";

const MeetingDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");

  const [meetingData, setMeetingData] = useState(null);
  const [todoItems, setTodoItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO 상태 업데이트 함수
  const handleUpdateTodo = (updatedItem) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.objectId === updatedItem.objectId ? updatedItem : item
      )
    );
  };

  useEffect(() => {
    const fetchMeetingDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("로그인 토큰이 없습니다.");
        }

        if (!code) {
          throw new Error("회의 코드가 없습니다.");
        }

        const response = await fetch(
          `http://localhost:8080/meeting/summary?code=${code}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`회의 정보를 불러올 수 없습니다. 오류: ${errorMessage}`);
        }

        const data = await response.json();
        console.log("받은 데이터:", data);

        if (data) {
          setMeetingData(data);
          setTodoItems(data.todos || []);
        } else {
          throw new Error("회의 데이터를 불러올 수 없습니다.");
        }
      } catch (err) {
        console.error("데이터 로드 중 오류:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingDetail();
  }, [code]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!meetingData) return <div>회의 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="bg-white w-full min-h-screen px-10 pt-10">
      <Button onClick={() => navigate("/main")} className="font-semibold text-xl mb-5">
        WSC
      </Button>
      <div className="flex gap-12 items-start">
        <div className="flex-1 pr-8">
          <MeetingHeader
            data={{
              date: new Date(meetingData.createdAt)
                .toISOString()
                .split("T")[0]
                .replace(/-/g, "."),
              title: meetingData.title,
              host: meetingData.host,
              participants: meetingData.participants || [],
            }}
          />
          <div className="mt-10">
            <div className="bg-[#f9dada] w-fit px-4 py-1 text-[24px] font-bold rounded-full mb-4">
              TODO
            </div>
            <TodoList todoItems={todoItems} onUpdate={handleUpdateTodo} />
          </div>
        </div>
        <div className="w-px bg-gray-300 h-[750px]" />
        <div className="flex-1 pl-5">
          <MeetingContent
            content={
              <span className="text-xl leading-relaxed text-gray-800 text-left">
                {meetingData.description || "회의 내용이 없습니다."}
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
