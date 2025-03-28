import Badge from "./ui/badge";
import React from "react";

const MeetingHeader = ({ data }) => {
  const { date, title, host, participants } = data || {};
  return (
    <div className="flex-1 pr-8">
      {/* Date */}
      <div className="font-bold text-[25px]">{date}</div>

      {/* Meeting Title */}
      <h1 className="font-bold text-4xl mt-2">{title}</h1>

      {/* Host Badge */}
      <div className="mt-8">
        <Badge className="bg-[#ffec82] text-black hover:bg-[#ffec82] font-light text-xl px-3 py-1 rounded-[5px]">
          Host
        </Badge>
        <span className="ml-6 font-medium text-xl">{host}</span>
      </div>

      {/* Participants Badge */}
      <div className="mt-4 flex items-center gap-4">
        <Badge className="bg-[#93d7f2] text-black hover:bg-[#93d7f2] font-light text-xl px-2.5 py-1 rounded-[5px]">
          Participants
        </Badge>
        <div className="flex gap-4 mt-1">
          {participants?.map((participant, index) => (
            <span key={index} className="font-medium text-base">
              {participant}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MeetingHeader;