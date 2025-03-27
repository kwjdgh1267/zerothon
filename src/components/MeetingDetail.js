import React from "react";
import MeetingHeader from "./MeetingHeader";
import TodoList from "./TodoList";
import MeetingContent from "./MeetingContent";
import { Separator } from "./ui/separator";

const MeetingDetail = () => {
  // 여기 나중에 백엔드에서 받아올 정보들
  const meetingData = {
    date: "26.03.25",
    title: "회의이름 1",
    host: "Name1",
    participants: ["Name2", "Name3", "Name4"],
  };

  const todoItems = [
    { topic: "[주제 1] Anim nostrud in laboris minim voluptate commodo.", assignee: "Name3" },
    { topic: "[주제 2] Anim nostrud in laboris minim voluptate commodo.", assignee: "Name2" },
    { topic: "[주제 3] Anim nostrud in laboris minim voluptate commodo.", assignee: "Name4" },
    { topic: "[주제 4] Anim nostrud in laboris minim voluptate commodo.", assignee: "Name1" },
    { topic: "[주제 5] Anim nostrud in laboris minim voluptate commodo.", assignee: "Name1" },
  ];

  const meetingContent = `
[주제 1] 프로젝트 진행 상황
제품 개발: 기능 테스트 완료, 최종 디자인 확정
생산 일정: 4월 초 양산 시작 예정, 공정 안정화 작업 진행 중
법적 검토: 특허 및 상표 등록 절차 완료

[주제 2] 마케팅 전략 논의
목표 시장 분석: 20~30대 주요 타겟층, 초기 고객 확보 방안 검토
온라인 홍보: SNS 마케팅 캠페인 기획, 인플루언서 협업 검토
오프라인 홍보: 체험형 이벤트 진행 검토, 팝업스토어 가능성 논의

[주제 3] 출시 일정 및 목표
4월 10일 사전 예약 시작, 4월 25일 공식 출시
출시 후 3개월 내 5만 개 판매 목표 설정
고객 피드백 반영을 위한 설문조사 및 데이터 수집 계획 수립

[주제 4] 기타 논의 사항
가격 정책 및 프로모션 전략 재검토
고객 서비스 및 AS 정책 확정
투자 유치 및 파트너십 확대 방안 논의

다음 회의: 2025년 4월 1일, 최종 마케팅 자료 점검 및 사전 예약 전략 확정 예정
`;

  return (
    <div className="bg-white w-full min-h-screen p-10">
      <div className="text-blue-500 text-xl font-semibold mb-6">meeting detail</div>
      <div className="border-2 border-blue-400 p-10 rounded-lg">
        <div className="font-bold mb-6">Your Logo</div>
        <div className="flex">
          <div className="flex-1 pr-8">
            <MeetingHeader data={meetingData} />
            <TodoList items={todoItems} />
          </div>
          <Separator orientation="vertical" className="mx-4" />
          <div className="flex-1 pl-8">
            <MeetingContent content={meetingContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
