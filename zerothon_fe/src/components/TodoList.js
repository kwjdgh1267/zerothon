import React, { useState } from "react";
import axios from "axios";

const TodoList = ({ todoItems, onUpdate }) => {
  const [loadingIds, setLoadingIds] = useState([]); // 로딩 상태 관리

  // 할 일 완료 상태 변경 함수
  const handleCheckboxChange = async (item) => {
    try {
      // 상태 반전하여 로컬에서 먼저 업데이트
      const updatedStatus = !item.status;
      const updatedItem = { ...item, status: updatedStatus };
      onUpdate(updatedItem);

      // 로딩 상태로 설정하여 중복 클릭 방지
      setLoadingIds((prev) => [...prev, item.objectId]);

      // 토큰 가져오기
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("로그인 토큰이 없습니다.");
      }

      // 백엔드로 상태 변경 요청
      const response = await axios.put(
        `http://localhost:8080/todos`,
        {
          objectId: item.objectId,
          status: updatedStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      console.log(`상태 변경 완료: ${updatedStatus ? "완료" : "미완료"} status: ${updatedStatus}`);
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("상태 변경 중 오류:", error.message);

      // 상태 변경 실패 시 원래 상태로 복구
      const restoredItem = { ...item, status: item.status };
      onUpdate(restoredItem);
    } finally {
      // 로딩 상태 해제
      setLoadingIds((prev) => prev.filter((id) => id !== item.objectId));
    }
  };

  return (
    <div className="p-4">
      {todoItems.map((item, index) => (
        <div
          key={item.objectId || index}
          className="flex items-center gap-3 mb-2 p-2 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100"
        >
          <input
            type="checkbox"
            checked={item.status}
            onChange={() => handleCheckboxChange(item)}
            disabled={loadingIds.includes(item.objectId)}
            className="w-6 h-6 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            style={{ minWidth: "1.5rem", minHeight: "1.5rem" }} // 고정 크기 설정
          />
          <span className={`ml-2 text-lg font-medium ${item.status ? "line-through text-gray-400" : "text-gray-800"}`}>
            {item.asignee}: {item.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
