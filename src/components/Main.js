import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Main = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/meetings") // 백엔드 API 호출
      .then((response) => response.json())
      .then((data) => setMeetings(data)) // 받아온 데이터를 상태로 저장
      .catch((error) => console.error("Error fetching meetings:", error));
  }, []);

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1440px] min-h-[900px] relative p-10">
        {/* Logo */}
        <div className="[font-family: 'Poppins-SemiBold', Helvetica] font-semibold text-black text-xl mb-16">
          Your Logo
        </div>
        <div className="flex items-start gap-40">
          <div className="w-2/3 max-w-[700px]">
            {meetings.length > 0 ? (
              meetings.map((meeting) => (
                <React.Fragment key={meeting.id}>
                  <div className="grid grid-cols-[250px_1fr] items-center py-6">
                    <div className="[font-family: 'Poppins-Bold', Helvetica] font-bold text-black text-[31px] mr-32">
                      {meeting.date}
                    </div>
                    <div className="[font-family: 'Poppins-Bold', Helvetica] font-bold text-black text-[31px] mr-32">
                      <Link to={`/meeting/${meeting.id}`} className="text-black hover:underline">
                        {meeting.name}
                      </Link>
                    </div>
                  </div>
                  <Separator className="bg-black/10 h-[1.5px] mt-5" />
                </React.Fragment>
              ))
            ) : (
              <p className="text-black text-lg">회의가 없습니다.</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-end mt-32 gap-8">
            <Link to="/code-input">
              <Button className="h-[60px] w-48 bg-[#f7b3b3] hover:bg-[#f7b3b3]/90 rounded-[5px]">
                <span className="[font-family:'Poppins-Regular', Helvetica] font-normal text-white text-[25px]">
                  코드 입력하기
                </span>
              </Button>
            </Link>

            <Link to="/code-create">
              <Button className="h-[60px] w-48 bg-[#f7b3b3] hover:bg-[#f7b3b3]/90 rounded-[5px]">
                <span className="[font-family:'Poppins-Regular', Helvetica] font-normal text-white text-[25px]">
                  코드 생성하기
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
