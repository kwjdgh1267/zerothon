import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import React from "react";

const CodeCreate = () => {
  const navigate = useNavigate();
  const codeValue = "a32%24&&&79bcd";

  return (
    <div className="bg-white flex flex-col justify-between items-center w-full h-screen p-10">
        {/* 상단 */}
        <div className="w-full">
            <Button 
            onClick={() => navigate("/main")}
            className="font-semibold text-xl mb-16">WSC</Button>
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
