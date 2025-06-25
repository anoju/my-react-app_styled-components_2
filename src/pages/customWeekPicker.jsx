import React, { useState } from "react";
import { DatePicker, Segmented } from "antd";
import { styled } from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const SegmentedContainer = styled.div`
  margin-bottom: 20px;

  .ant-segmented {
    background-color: #f5f5f5;
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

const { WeekPicker, MonthPicker } = DatePicker;

const CustomWeekPicker = () => {
  const [pickerType, setPickerType] = useState("주"); // 일, 주, 월
  const [customWeekRange, setCustomWeekRange] = useState(null);
  const [hoverWeekRange, setHoverWeekRange] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // 일/월 선택용

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

  // 날짜 셀 렌더링 (주 모드에서만 사용)
  const cellRender = (current, info) => {
    if (info.type !== "date" || pickerType !== "주") return info.originNode;

    // 표시할 범위 결정 (호버가 우선, 없으면 선택된 범위)
    const displayRange = hoverWeekRange || customWeekRange;
    const isInDisplayRange =
      displayRange && isDateInRange(current, displayRange);

    let cellClasses = ["ant-picker-cell-inner"];

    if (isInDisplayRange) {
      // 호버 중이면 호버 스타일, 아니면 선택 스타일
      cellClasses.push(
        hoverWeekRange ? "custom-week-hover" : "custom-week-selected"
      );

      if (current.isSame(displayRange.start, "day")) {
        cellClasses.push(
          hoverWeekRange
            ? "custom-week-hover-start"
            : "custom-week-selected-start"
        );
      }
      if (current.isSame(displayRange.end, "day")) {
        cellClasses.push(
          hoverWeekRange ? "custom-week-hover-end" : "custom-week-selected-end"
        );
      }
    }

    return (
      <div
        className={cellClasses.join(" ")}
        onMouseEnter={() => {
          if (pickerType === "주") {
            const range = getWednesdayToTuesdayRange(current);
            setHoverWeekRange(range);
          }
        }}
        onMouseLeave={() => {
          if (pickerType === "주") {
            setHoverWeekRange(null);
          }
        }}
      >
        <span>{current.date()}</span>
      </div>
    );
  };

  // 일반 날짜 변경 핸들러 (일/월)
  const handleNormalDateChange = (date, dateString) => {
    setSelectedDate(date);

    console.log(`선택된 ${pickerType}:`, dateString);
  };

  // 주 선택 변경 핸들러
  const handleWeekDateChange = (date) => {
    if (date) {
      const range = getWednesdayToTuesdayRange(date);
      setCustomWeekRange(range);
      setHoverWeekRange(null);

      console.log("선택된 커스텀 주 범위:", {
        start: range.start.format("YYYY-MM-DD (dddd)"),
        end: range.end.format("YYYY-MM-DD (dddd)"),
      });
    } else {
      setCustomWeekRange(null);
      setHoverWeekRange(null);
    }
  };

  // Segmented 변경 핸들러
  const handleSegmentedChange = (value) => {
    setPickerType(value);

    // 선택 타입이 변경되면 모든 상태 초기화
    setCustomWeekRange(null);
    setHoverWeekRange(null);
    setSelectedDate(null);
  };

  // DatePicker 렌더링
  const renderDatePicker = () => {
    const commonProps = {
      style: { width: 350 },
    };

    switch (pickerType) {
      case "일":
        return (
          <DatePicker
            {...commonProps}
            value={selectedDate}
            onChange={handleNormalDateChange}
            format="YYYY-MM-DD"
            placeholder="날짜를 선택하세요"
          />
        );

      case "주":
        return (
          <DatePicker
            {...commonProps}
            onChange={handleWeekDateChange}
            value={customWeekRange ? customWeekRange.start : null}
            cellRender={cellRender}
            format={() => {
              if (customWeekRange) {
                return `${customWeekRange.start.format("YYYY-MM-DD")} ~ ${customWeekRange.end.format("YYYY-MM-DD")}`;
              }
              return "YYYY-MM-DD";
            }}
            inputReadOnly
            classNames={{
              popup: "custom-week-dropdown",
            }}
            placeholder="날짜를 선택하세요"
            onPanelChange={() => {
              if (!customWeekRange) {
                setHoverWeekRange(null);
              }
            }}
          />
        );

      case "월":
        return (
          <DatePicker
            {...commonProps}
            picker="month"
            value={selectedDate}
            onChange={handleNormalDateChange}
            format="YYYY-MM"
            placeholder="월을 선택하세요"
          />
        );

      default:
        return null;
    }
  };

  // 정보 박스 데이터 반환
  const getInfoBoxData = () => {
    switch (pickerType) {
      case "일":
        return selectedDate
          ? {
              title: "선택된 날짜 정보",
              data: {
                date: selectedDate.format("YYYY-MM-DD"),
                dayOfWeek: selectedDate.format("dddd"),
                timestamp: selectedDate.valueOf(),
              },
            }
          : null;

      case "주": {
        const range = customWeekRange || hoverWeekRange;
        return range
          ? {
              title: `${customWeekRange ? "선택된" : "미리보기"} 커스텀 주 범위`,
              data: {
                startDate: range.start.format("YYYY-MM-DD"),
                endDate: range.end.format("YYYY-MM-DD"),
                startTimestamp: range.start.valueOf(),
                endTimestamp: range.end.valueOf(),
              },
            }
          : null;
      }

      case "월":
        return selectedDate
          ? {
              title: "선택된 월 정보",
              data: {
                month: selectedDate.format("YYYY-MM"),
                year: selectedDate.format("YYYY"),
                monthName: selectedDate.format("MMMM"),
                timestamp: selectedDate.valueOf(),
              },
            }
          : null;

      default:
        return null;
    }
  };

  const infoData = getInfoBoxData();

  return (
    <Container>
      <h3>📅 다목적 DatePicker</h3>

      <SegmentedContainer>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
        >
          선택 타입:
        </label>
        <Segmented
          options={["일", "주", "월"]}
          value={pickerType}
          onChange={handleSegmentedChange}
          size="large"
        />
      </SegmentedContainer>

      {renderDatePicker()}

      {infoData && (
        <InfoBox>
          <h4>{infoData.title}:</h4>
          {pickerType === "주" && (customWeekRange || hoverWeekRange) && (
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
          )}

          <h4>API 전송용 데이터:</h4>
          <pre>{JSON.stringify(infoData.data, null, 2)}</pre>
        </InfoBox>
      )}

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>사용법:</strong>
          <br />
          {pickerType === "일" && (
            <>
              • <strong>날짜 선택:</strong> 달력에서 원하는 날짜를 클릭하세요
              <br />• <strong>형식:</strong> YYYY-MM-DD 형식으로 표시됩니다
            </>
          )}
          {pickerType === "주" && (
            <>
              • <strong>마우스 오버:</strong> 날짜에 마우스를 올리면 해당 주의
              수요일~화요일 범위가 미리보기됩니다
              <br />• <strong>클릭 선택:</strong> 날짜를 클릭하면 수요일~화요일
              범위가 확정 선택됩니다
              <br />• <strong>입력 필드:</strong> 선택된 범위가 "YYYY-MM-DD ~
              YYYY-MM-DD" 형식으로 표시됩니다
              <br />• <strong>시각적 피드백:</strong> 선택된 범위는 파란색으로
              하이라이트됩니다
            </>
          )}
          {pickerType === "월" && (
            <>
              • <strong>월 선택:</strong> 달력에서 원하는 월을 클릭하세요
              <br />• <strong>형식:</strong> YYYY-MM 형식으로 표시됩니다
            </>
          )}
        </p>
      </div>
    </Container>
  );
};

export default CustomWeekPicker;
