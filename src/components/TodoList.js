import React from "react";
import axios from "axios";

const TodoList = ({ todoItems, onUpdate }) => {
  // 할 일 완료 상태 변경 함수
  const handleCheckboxChange = async (item) => {
    try {
      // 상태 반전하여 로컬에서 먼저 업데이트
      const updatedItem = { ...item, status: !item.status };
      onUpdate(updatedItem);

      // 토큰 가져오기
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("로그인 토큰이 없습니다.");
      }

      // 백엔드로 상태 변경 요청
      const response = await axios.put(
        `http://localhost:8080/todos`,  // ✅ PUT 엔드포인트 수정
        { objectId: item.objectId },  // ✅ JSON 형식으로 ID 전송
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // ✅ 토큰 정보 추가
          },
        }
      );

      console.log("상태 변경 완료:", response.data);
    } catch (error) {
      console.error("상태 변경 중 오류:", error.message);
    }
  };

  return (
    <div>
      {todoItems.map((item, index) => (
        <div key={item.objectId || index} className="flex items-center gap-4 mb-2">
          <input
            type="checkbox"
            checked={item.status}
            onChange={() => handleCheckboxChange(item)}
            className="w-6 h-6"
          />
          <span className={item.status ? "line-through" : ""}>
            {item.asignee}: {item.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
