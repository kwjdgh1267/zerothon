import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 Hook
import React from "react";

const Main = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  // Meeting data for mapping
  const meetings = [
    {date: "2025.03.07" , name: "회의이름 1"},
    {date: "2025.03.14", name: "회의이름 2"},
    {date: "2025.03.23", name: "회의이름 3"},
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1440px] min-h-[900px] relative p-10">
        {/* Logo */}
        <div className="[font-family: 'Poppins-SemiBold', Helvetica] font-semibold text-black text-xl mb-16">
          WSC
        </div>
        <div className="flex items-start gap-40">
          <div className="w-2/3 max-w-[700px]">
            {meetings.map((meeting, index) => (
              <React.Fragment key={index}>
                <div className="grid grid-cols-[250px_1fr] items-center py-6">
                  <div className="[font-family: 'Poppins-Bold', Helvetica] font-bold text-black text-[31px] mr-32">
                    {meeting.date}
                  </div>
                  <div className="[font-family: 'Poppins-Bold', Helvetica] font-bold text-black text-[31px] mr-32">
                    {meeting.name}
                  </div>
                </div>
                <Separator className="bg-black/10 h-[1.5px] mt-5" />
              </React.Fragment>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-end mt-32 gap-8">
            <Button 
            onClick={() => navigate("/code-input")}
            className="h-[60px] w-48 bg-[#f7b3b3] hover:bg-[#f7b3b3]/90 rounded-[5px]">
              <span className="[font-family:'Poppins-Regular', Helvetica] font-normal text-white text-[25px]">
                코드 입력하기
              </span>
            </Button>

            <Button 
            onClick={() => navigate("/code-create")}
            className="h-[60px] w-48 bg-[#f7b3b3] hover:bg-[#f7b3b3]/90 rounded-[5px]">
              <span className="[font-family:'Poppins-Regular', Helvetica] font-normal text-white text-[25px]">
                코드 생성하기
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;