import React from "react";
import { Card, CardContent } from "./ui/card";

export default function MeetingContent({ content }) {
  return (
    <div className="flex-1 pl-8">
      <div className="relative w-[193px] h-[82px] mb-4">
        <div className="w-[187px] text-5xl font-bold">회의 내용</div>
      </div>
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="font-medium text-xl whitespace-pre-line">
            {content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}