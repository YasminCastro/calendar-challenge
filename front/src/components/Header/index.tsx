import {
  HeaderWrapper,
  HeaderContainer,
  TodayButton,
  ArrowButton,
} from "./styles";
import moment from "moment";

import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { useCalendar } from "../../providers/calendarProvider";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const Header = () => {
  const { selectedDate, setSelectedDate, today, calendar } = useCalendar();

  if (calendar.length === 0) {
    return <></>;
  }

  const prevMonth = moment(selectedDate).subtract(1, "month");
  const nextMonth = moment(selectedDate).add(1, "month");
  const month = moment(selectedDate).format("MMMM [of] YYYY");

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <h1>Calendar</h1>

        <TodayButton onClick={() => setSelectedDate(today)}>Today</TodayButton>

        <ArrowButton onClick={() => setSelectedDate(prevMonth)}>
          <MdOutlineArrowBackIos />
        </ArrowButton>

        <ArrowButton onClick={() => setSelectedDate(nextMonth)}>
          <MdOutlineArrowForwardIos />
        </ArrowButton>

        <h2>{capitalizeFirstLetter(month)}</h2>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
