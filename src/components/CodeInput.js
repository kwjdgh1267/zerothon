import React, { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const CodeInput = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // 여기서 입력된 코드로 페이지 이동 로직 작성
    if (code.trim() !== "") {
      navigate(`/meeting/${code}`);
    }
  };

  return (
    <div className="bg-white flex flex-col justify-between items-center w-full h-screen p-10">
      {/* 상단 */}
      <div className="w-full">
        <Button 
        onClick={() => navigate("/main")}
        className="font-semibold text-xl mb-16">Your Logo</Button>
      </div>

      {/* 중앙 입력란 */}
      <div className="flex items-center justify-center flex-1">
        <label className="font-bold text-[28px] mr-4">Your code :</label>
        <input
          type="text"
          placeholder="Enter your code...."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border-b border-black focus:outline-none text-lg placeholder-gray-400 w-[300px] text-2xl"
        />
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-center mt-10">
        <Button
            onClick={() => navigate("/onmeeting")}
            className="w-48 h-[60px] bg-[#f7b3b3] hover:bg-[#f7b3b3]/90 rounded-[5px]"
        >
            <span className="text-white text-[20px]">회의하러 가기</span>
        </Button>
      </div>
    </div>
  );
};

export default CodeInput;
