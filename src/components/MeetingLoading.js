import { Card, CardContent } from "./ui/card";
import { Loader } from "lucide-react";
import React from "react";

const MeetingLoading = () => {
  return (
    <div className="bg-white flex justify-center items-center w-full h-screen">
      <Card className="border-none shadow-none">
        <CardContent className="flex flex-row items-center gap-4 p-6">
          <Loader className="w-[105px] h-[105px] text-blue-500 animate-spin" />
          <div className="flex flex-col items-center">
            <h1 className="font-['Poppins-Bold','Helvetica'] font-bold text-[36px] text-black text-center tracking-[0] leading-normal">
              회의 내용을 요약 중입니다..
            </h1>
            <p className="font-['Poppins-Regular','Helvetica'] font-normal text-lg text-black text-center tracking-[0] leading-normal mt-4">
              잠시만 기다려주세요.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MeetingLoading;
