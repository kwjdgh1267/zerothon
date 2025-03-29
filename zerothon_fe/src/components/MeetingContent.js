import React from "react";
import { Card, CardContent } from "./ui/card";

export default function MeetingContent({ content }) {
  return (
    <div className="flex-1">
      
      <div className="relative w-[193px] h-[45px] mb-1">
        <img
          src="/highlight.png" 
          alt="highlight"
          className="absolute top-1 left-[-12px] w-full h-full -z-80 object-contain"
        />
        <div className="w-[187px] text-4xl font-bold mt-[50px] relative z-10">회의 내용</div>
      </div>
      <Card className="border-none shadow-none mt-[-20px]">
        <CardContent className="p-0">
          <div className="font-medium text-xl whitespace-pre-line">
            {content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}