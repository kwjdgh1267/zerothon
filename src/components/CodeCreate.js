import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

// 백엔드로부터 난수를 받아오는 함수
const fetchCodeFromBackend = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/code"
    );
    console.log("서버 응답:", response.data);

    // 응답 데이터가 문자열인 경우 그대로 반환
    if (typeof response.data === "string") {
      return response.data;
    }

    return "No Code Available";
  } catch (error) {
    console.error("서버 요청 실패:", error);
    alert("서버 요청 실패! 다시 시도해 주세요.");
    return "Error";
  }
};

const CodeCreate = () => {
  const navigate = useNavigate();
  const [codeValue, setCodeValue] = useState("");

  useEffect(() => {
    const getCode = async () => {
      const code = await fetchCodeFromBackend();
      setCodeValue(code);  // 상태 업데이트
    };
    getCode();
  }, []);

  return (
    <div className="bg-white flex flex-col justify-between items-center w-full h-screen p-10">

      {/* 상단 */}
      <div className="w-full">
        <Button 
          onClick={() => navigate("/main")}
          className="font-semibold text-xl mb-16"
        >
          Your Logo
        </Button>
      </div>


      {/* 중앙 영역 */}
      <div className="flex flex-col items-center justify-center h-[600px]">
        <div className="flex items-end gap-4">
          <span className="font-bold text-[28px]">Your code is...</span>
          <div className="flex flex-col items-start">
            <span className="text-[28px]">{codeValue || "Loading..."}</span>
            <Separator className="w-[500px] h-[1px] bg-black mt-1" />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <Button
          onClick={() => navigate("/onmeeting")}
          className="w-48 h-[60px] bg-[#f7b3b3] hover:bg-[#f7b3b3]/90 rounded-[5px]"
        >
          <span className="text-white text-[25px]">회의하러 가기</span>
        </Button>
      </div>
    </div>
  );
};

export default CodeCreate;
