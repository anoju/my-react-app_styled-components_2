import React, { useState } from "react";
import { DatePicker } from "antd";
import { styled } from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
  }

  input {
    width: 400px;
    padding: 8px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    font-size: 14px;
    background-color: #fff;

    &:focus {
      border-color: #1890ff;
      outline: none;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }
`;

const InfoBox = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 6px;

  h4 {
    margin-top: 0;
    color: #333;
  }

  pre {
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    font-size: 12px;
    overflow-x: auto;
  }
`;
const { WeekPicker } = DatePicker;

const CustomWeekPicker = () => {
  const [customWeekRange, setCustomWeekRange] = useState(null);
  const [hoverWeekRange, setHoverWeekRange] = useState(null);
  const [displayValue, setDisplayValue] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  // 선택된 날짜가 속한 주의 수요일~화요일 범위를 계산하는 함수
  const getWednesdayToTuesdayRange = (selectedDate) => {
    if (!selectedDate) return null;

    const dayOfWeek = selectedDate.day();
    let daysToWednesday;

    if (dayOfWeek >= 3) {
      daysToWednesday = dayOfWeek - 3;
    } else {
      daysToWednesday = dayOfWeek + 4;
    }

    const wednesday = selectedDate.subtract(daysToWednesday, "day");
    const tuesday = wednesday.add(6, "day");

    return {
      start: wednesday,
      end: tuesday,
    };
  };

  // 날짜가 특정 범위에 포함되는지 확인
  const isDateInRange = (date, range) => {
    if (!range) return false;
    const { start, end } = range;
    return (
      date.isSame(start, "day") ||
      date.isSame(end, "day") ||
      (date.isAfter(start, "day") && date.isBefore(end, "day"))
    );
  };

  // 날짜 셀 렌더링
  const cellRender = (current, info) => {
    if (info.type !== "date") return info.originNode;

    // 표시할 범위 결정 (호버가 우선, 없으면 선택된 범위)
    const displayRange = hoverWeekRange || customWeekRange;
    const isInDisplayRange =
      displayRange && isDateInRange(current, displayRange);

    let cellClasses = [];

    if (isInDisplayRange) {
      // 호버 중이면 호버 스타일, 아니면 선택 스타일
      cellClasses.push(
        hoverWeekRange ? "custom-week-hover" : "custom-week-selected"
      );

      if (current.isSame(displayRange.start, "day")) {
        cellClasses.push("custom-week-start");
      }
      if (current.isSame(displayRange.end, "day")) {
        cellClasses.push("custom-week-end");
      }
    }

    return (
      <div
        className={[
          ...cellClasses,
          isInDisplayRange ? "custom-week-hover" : "",
          current.isSame(displayRange.start, "day")
            ? "custom-week-hover-start"
            : "",
          current.isSame(displayRange.end, "day")
            ? "custom-week-hover-end"
            : "",
        ].join(" ")}
        onMouseEnter={() => {
          const range = getWednesdayToTuesdayRange(current);
          setHoverWeekRange(range);
        }}
        onMouseLeave={() => {
          setHoverWeekRange(null);
        }}
      >
        {current.date()}
      </div>
    );
  };

  const handleDateChange = (date) => {
    if (date) {
      const range = getWednesdayToTuesdayRange(date);
      setCustomWeekRange(range);
      setHoverWeekRange(null);

      // input에 표시될 값 설정
      const displayText = `${range.start.format("YYYY-MM-DD")} ~ ${range.end.format("YYYY-MM-DD")}`;
      setDisplayValue(displayText);

      console.log("선택된 커스텀 주 범위:", {
        start: range.start.format("YYYY-MM-DD (dddd)"),
        end: range.end.format("YYYY-MM-DD (dddd)"),
      });
    } else {
      setCustomWeekRange(null);
      setHoverWeekRange(null);
      setDisplayValue("");
    }

    setPickerOpen(false); // 선택 후 달력 닫기
  };

  return (
    <Container>
      <h3>커스텀 WeekPicker - 수요일~화요일 선택</h3>

      <WeekPicker placeholder="주를 선택하세요" style={{ width: 200 }} />

      <InputContainer>
        <label>선택된 주 범위 (수요일 ~ 화요일):</label>
        <input
          type="text"
          value={displayValue}
          placeholder="달력에서 날짜를 선택하면 수요일~화요일 범위가 표시됩니다"
          readOnly
          onClick={() => setPickerOpen(true)}
          style={{ cursor: "pointer" }}
        />
      </InputContainer>

      <DatePicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onChange={handleDateChange}
        value={customWeekRange ? customWeekRange.start : null}
        placeholder="날짜를 선택하세요"
        style={{ width: 350 }}
        cellRender={cellRender}
        format={() => displayValue || "YYYY-MM-DD"}
        inputReadOnly
        onPanelChange={() => {
          // 패널 변경 시 hover 상태 초기화
          if (!customWeekRange) {
            setHoverWeekRange(null);
          }
        }}
      />

      {(customWeekRange || hoverWeekRange) && (
        <InfoBox>
          <h4>{customWeekRange ? "선택된" : "미리보기"} 커스텀 주 범위:</h4>
          <p>
            <strong>시작 (수요일):</strong>{" "}
            {(customWeekRange || hoverWeekRange).start.format(
              "YYYY년 MM월 DD일 (dddd)"
            )}
            <br />
            <strong>종료 (화요일):</strong>{" "}
            {(customWeekRange || hoverWeekRange).end.format(
              "YYYY년 MM월 DD일 (dddd)"
            )}
          </p>

          {customWeekRange && (
            <>
              <h4>API 전송용 데이터:</h4>
              <pre>
                {JSON.stringify(
                  {
                    startDate: customWeekRange.start.format("YYYY-MM-DD"),
                    endDate: customWeekRange.end.format("YYYY-MM-DD"),
                    startTimestamp: customWeekRange.start.valueOf(),
                    endTimestamp: customWeekRange.end.valueOf(),
                  },
                  null,
                  2
                )}
              </pre>
            </>
          )}
        </InfoBox>
      )}

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>기능 설명:</strong>
          <br />• <strong>마우스 오버:</strong> 날짜에 마우스를 올리면 해당 주의
          수요일~화요일 범위가 미리보기됩니다
          <br />• <strong>클릭 선택:</strong> 날짜를 클릭하면 수요일~화요일
          범위가 확정 선택됩니다
          <br />• <strong>입력 필드:</strong> 선택된 범위가 "YYYY-MM-DD ~
          YYYY-MM-DD" 형식으로 표시됩니다
          <br />• <strong>시각적 피드백:</strong> 선택된 범위는 파란색으로
          하이라이트됩니다
        </p>
      </div>
    </Container>
  );
};

export default CustomWeekPicker;
