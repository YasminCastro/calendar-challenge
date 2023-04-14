import styled from "styled-components";
import { colors } from "../../styles/GlobalStyles";

export const MonthContainer = styled.div`
  margin: 0px 100px 24px 100px;

  @media (max-width: 1400px) {
    margin: 0px 50px 12px 50px;
  }

  @media (max-width: 800px) {
    margin: 0px;
  }
`;

export const CalendarTable = styled.table`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  tr,
  tbody,
  thead {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
  }

  td,
  th {
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .weekdays {
    background: ${colors.darkRed};
  }

  .weekdays th {
    text-align: center;
    text-transform: uppercase;
    line-height: 20px;
    border: none !important;
    padding: 10px 6px;
    color: #fff;
    font-size: 13px;
  }

  td {
    min-height: 14vh;
    display: flex;
    flex-direction: column;
  }

  .event-desc {
    color: #666;
    margin: 3px 0 7px 0;
    text-decoration: none;
  }

  .other-month {
    background: #f5f5f5;
    color: #666;
  }

  .today {
    background: #e8d6d5;
  }

  /* ============================
				Mobile 
   ============================*/

  .weekSmall {
    display: none;
  }

  @media (max-width: 650px) {
    .weekFull {
      display: none;
    }

    .weekSmall {
      display: grid;
    }
  }
`;

export const DayButton = styled.button`
  height: 100%;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  display: flex;
  justify-content: center;
`;

export const ReminderButton = styled.button<{ color: string }>`
  width: 100%;
  border: none;
  cursor: pointer;

  display: flex;
  font-size: 12px;
  border-radius: 4px;
  padding: 6px;
  margin-bottom: 5px;
  background: ${({ color }) => color};
  color: #ffff;
`;
