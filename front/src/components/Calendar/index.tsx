import moment from "moment";
import React, { useState } from "react";

import { useCalendar } from "../../providers/calendarProvider";
import { useReminder } from "../../providers/reminderProvider";
import CreateReminder from "../ReminderModal/CreateReminder";
import EditReminder from "../ReminderModal/EditReminder";
import {
  CalendarTable,
  DayButton,
  MonthContainer,
  ReminderButton,
} from "./styles";

const weekDaysFull = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const weekDaysSmall = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const Calendar = () => {
  const { calendar, selectedDate, today } = useCalendar();
  const { reminders } = useReminder();
  const [createReminderModal, setCreateReminderModal] = useState(false);
  const [editReminderModal, setEditReminderModal] = useState(false);
  const [reminderDate, setReminderDate] = useState("");
  const [reminderId, setReminderId] = useState("");

  if (calendar.length === 0) {
    return <></>;
  }

  const dateClickHandler = (date: any) => {
    setCreateReminderModal(true);
    setReminderDate(date);
  };

  const reminderClickHandler = (reminderId: any) => {
    setReminderId(reminderId);
    setEditReminderModal(true);
  };

  const selectedMonth = moment(selectedDate).format("MM");
  const todayDate = moment(today).format("DD-MM-YYYY");

  return (
    <MonthContainer>
      <CalendarTable>
        <thead>
          <tr className="weekdays weekFull">
            {weekDaysFull.map((weekday: string) => (
              <th key={weekday}>{weekday}</th>
            ))}
          </tr>
          <tr className="weekdays weekSmall">
            {weekDaysSmall.map((weekday: string) => (
              <th key={weekday}>{weekday}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {calendar.map((week: any, index) => {
            return (
              <tr key={index} className="days">
                {week.days.map((dayObject: any) => {
                  const day = moment(dayObject).format("DD");
                  const month = moment(dayObject).format("MM");
                  const fullDate = moment(dayObject).format("DD-MM-YYYY");

                  const isThisMonth =
                    month === selectedMonth ? "this-month" : "other-month";
                  const isToday =
                    fullDate === todayDate ? "today" : "not-today";

                  return (
                    <td
                      className={`date ${isThisMonth} ${isToday}`}
                      key={fullDate}
                    >
                      <DayButton
                        onClick={(e) => {
                          dateClickHandler(e.currentTarget.value);
                        }}
                        value={fullDate}
                      >
                        {day}
                      </DayButton>
                      {reminders.map((reminder: any) => {
                        const date = moment(reminder.date).format("DD-MM-YYYY");

                        if (date === fullDate) {
                          return (
                            <ReminderButton
                              color={reminder.colorHex}
                              onClick={(e) => {
                                reminderClickHandler(e.currentTarget.value);
                              }}
                              value={reminder._id}
                            >
                              {reminder.message}
                            </ReminderButton>
                          );
                        }
                      })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </CalendarTable>
      {createReminderModal && (
        <CreateReminder
          open={createReminderModal}
          setOpen={setCreateReminderModal}
          reminderDate={reminderDate}
          day={reminderDate}
        />
      )}

      {editReminderModal && (
        <EditReminder
          open={editReminderModal}
          setOpen={setEditReminderModal}
          reminderDate={reminderDate}
          day={reminderDate}
          reminderId={reminderId}
        />
      )}
    </MonthContainer>
  );
};

export default Calendar;
