
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import MeetingHeader from "./MeetingHeader";
import TodoList from "./TodoList";
import MeetingContent from "./MeetingContent";
import { useNavigate, useParams } from "react-router-dom";


const MeetingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 회의 데이터 가져오기
    fetch(`http://localhost:8080/meetings?id=${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("회의 정보를 불러올 수 없습니다.");
        return response.json();
      })
      .then((data) => {
        if (data.length > 0 && data[0].summary && data[0].todo) {
          const todoList = Object.keys(data[0].todo).map((key) => ({
            assignedTo: key,
            task: data[0].todo[key],
          }));
          setMeeting({ summary: data[0].summary, todoList: todoList || [] });
        } else {
          throw new Error("회의 데이터가 올바르지 않습니다.");
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-screen">로딩 중...</div>;
  if (error) return <div className="flex items-center justify-center h-screen">{error}</div>;
  if (!meeting) return <div className="flex items-center justify-center h-screen">회의 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="bg-white w-full min-h-screen px-10 pt-10">
      <Button onClick={() => navigate("/main")} className="font-semibold text-xl mb-5">
        WSC
      </Button>
      <div className="flex gap-12 items-start">
        <div className="flex-1 pr-8">
          <MeetingHeader data={{ title: "회의 세부사항", date: "", host: "", participants: [] }} />
          <div className="mt-10">
            <div className="bg-[#f9dada] w-fit px-4 py-1 text-[24px] font-bold rounded-full mb-4">TODO</div>
            <TodoList
              todoItems={meeting.todoList}
              onCheckboxChange={() => {}}
              onParticipantChange={() => {}}
            />
          </div>
        </div>
        <div className="w-px bg-gray-300 h-[750px]" />
        <div className="flex-1 pl-5">
          <MeetingContent content={<span className="text-base">{meeting.summary}</span>} />
        </div>
      </div>
    </div>
    
  );
};

export default MeetingDetail;



