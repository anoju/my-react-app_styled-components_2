import React, { useState } from "react";
import { DatePicker } from "antd";
// dayjs는 Ant Design에서 내부적으로 사용되므로 직접 import할 필요 없음

const { WeekPicker } = DatePicker;

const CustomWeekPicker = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [customWeekRange, setCustomWeekRange] = useState(null);

  // 선택된 날짜가 속한 주의 수요일~화요일 범위를 계산하는 함수
  const getWednesdayToTuesdayRange = (selectedDate) => {
    if (!selectedDate) return null;

    // 선택된 날짜의 요일 구하기 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const dayOfWeek = selectedDate.day();

    // 수요일(3)까지의 차이 계산
    let daysToWednesday;
    if (dayOfWeek >= 3) {
      // 수요일 이후라면 해당 주의 수요일
      daysToWednesday = dayOfWeek - 3;
    } else {
      // 수요일 이전이라면 이전 주의 수요일
      daysToWednesday = dayOfWeek + 4;
    }

    // 수요일 날짜 계산
    const wednesday = selectedDate.subtract(daysToWednesday, "day");

    // 다음 주 화요일 계산 (수요일로부터 6일 후)
    const tuesday = wednesday.add(6, "day");

    return {
      start: wednesday,
      end: tuesday,
    };
  };

  const handleWeekChange = (date, dateString) => {
    setSelectedWeek(date);

    if (date) {
      const range = getWednesdayToTuesdayRange(date);
      setCustomWeekRange(range);

      console.log("선택된 주:", dateString);
      console.log("커스텀 주 범위:", {
        start: range.start.format("YYYY-MM-DD (dddd)"),
        end: range.end.format("YYYY-MM-DD (dddd)"),
      });
    } else {
      setCustomWeekRange(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>WeekPicker - 수요일~화요일 선택</h3>

      <WeekPicker
        onChange={handleWeekChange}
        placeholder="주를 선택하세요"
        style={{ width: 200 }}
      />

      {customWeekRange && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f5f5f5",
            borderRadius: "6px",
          }}
        >
          <h4>선택된 커스텀 주 범위:</h4>
          <p>
            <strong>시작:</strong>{" "}
            {customWeekRange.start.format("YYYY년 MM월 DD일 (dddd)")}
            <br />
            <strong>종료:</strong>{" "}
            {customWeekRange.end.format("YYYY년 MM월 DD일 (dddd)")}
          </p>

          <h4>실제 사용할 값:</h4>
          <pre
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            {`{
  startDate: "${customWeekRange.start.format("YYYY-MM-DD")}",
  endDate: "${customWeekRange.end.format("YYYY-MM-DD")}",
  startTimestamp: ${customWeekRange.start.valueOf()},
  endTimestamp: ${customWeekRange.end.valueOf()}
}`}
          </pre>
        </div>
      )}

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>동작 방식:</strong>
          <br />
          • 달력은 일요일~토요일로 표시됩니다
          <br />
          • 어떤 주를 선택해도 해당 주에 포함된 수요일부터 다음 주 화요일까지가
          선택됩니다
          <br />• 예: 1월 1일(월)이 포함된 주를 선택 → 12월 30일(수) ~ 1월
          5일(화) 범위가 선택됨
        </p>
      </div>
    </div>
  );
};

export default CustomWeekPicker;