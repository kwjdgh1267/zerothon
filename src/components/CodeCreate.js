import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// 난수 생성 함수
const generateRandomCode = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%$&";
  let code = "";
  for (let i = 0; i < 12; i++) {  // 12자리 난수 생성
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// 백엔드로 난수를 보내는 함수
const sendCodeToBackend = async (code: string) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/api/submit-code", 
      { code }
    );
    console.log("서버 응답:", response.data);
  } catch (error) {
    console.error("서버 요청 실패:", error);
    alert("서버 요청 실패! 다시 시도해 주세요.");
  }
};

const CodeCreate = () => {
  const navigate = useNavigate();
  const [codeValue, setCodeValue] = useState("");
  const hasSentCode = useRef(false);  // ref를 사용해 호출 여부 추적

  useEffect(() => {
    if (hasSentCode.current) return;  // 이미 호출한 경우 리턴

    const newCode = generateRandomCode();
    setCodeValue(newCode);
    sendCodeToBackend(newCode);  // 난수를 백엔드로 전송
    hasSentCode.current = true;  // 호출 후 ref 업데이트
  }, []);  // 의존성 배열을 빈 배열로 설정

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
                    <span className="text-[28px]">{codeValue}</span>
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
