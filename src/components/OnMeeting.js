import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 Hook
import React from "react";
//import useWebSocket from '../hooks/useWebSocket';
import useFakeWebSocket from "../hooks/useFakeWebSocket"; // 실제로는 나중에 useWebSocket으로 대체


const OnMeeting = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const participants = useFakeWebSocket(); // 여기로 실시간 받는 구조
    // Meeting participants data
    // const participants = [
    //     { id: 1, name: "Name1", bgColor: "bg-[#ff6edf52]" },
    //     { id: 2, name: "Name2", bgColor: "bg-[#f6ccd3]" },
    //     { id: 3, name: "Name3", bgColor: "bg-[#d5eaff]" },
    //     { id: 4, name: "Name4", bgColor: "bg-[#fffade]" },
    // ];

    return (
        <main className="bg-white flex flex-col items-center justify-between min-h-screen py-10 px-10">
        <div className="w-full max-w-[1440px] relative flex flex-col items-center">
            {/* Header */}
            <header className="w-full">
            <div className="w-full">
                <Button 
                onClick={() => navigate("/main")}
                className="font-semibold text-xl mb-16">WSC</Button>
            </div>
            </header>
            
            {/* Meeting title */}
            <h2 className="mt-5 mb-12 [font-family:'Poppins-Bold',Helvetica] font-bold text-black text-[31px]">
            회의 중...
            </h2>

            {/* Participants grid */}
            <div className="grid grid-cols-2 gap-8 mb-auto">
            {participants.map((participant) => (
                participant && ( // ✅ participant가 존재할 때만 렌더링
                <Card
                key={participant.id}
                className="w-[168px] h-[168px] rounded-[10px] bg-[#f3f3f3] opacity-80 relative"
                >
                    <CardContent className="p-0 h-full flex items-center justify-center">
                        <div className={`absolute inset-0 ${participant.bgColor} rounded-[84px]`}></div>
                        <p className="relative z-10 [font-family:'Poppins-Regular',Helvetica] font-normal text-black text-[28px]">
                        {participant.name}
                        </p>
                    </CardContent>
                </Card>
                )
            ))}
            </div>

            {/* End meeting button */}
            <Button 
                onClick={() => navigate("/meetingdetail")}
                className="mt-20 w-[179px] h-[60px] bg-[#f7b3b3] rounded-[5px] hover:bg-[#e9a5a5]">
                <span className="[font-family:'Poppins-Regular',Helvetica] font-normal text-white text-[25px]">
                    회의 종료
                </span>
            </Button>
        </div>
        </main>
    );
}

export default OnMeeting;