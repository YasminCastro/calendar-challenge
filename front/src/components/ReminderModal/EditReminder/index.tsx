import React, { useEffect, useState } from "react";
import { ModalBox, CloseButton, ModalHead } from "./styles";
import { MenuItem, Select, TextField, Modal, Button } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { CONFIG } from "../../../config";
import { useReminder } from "../../../providers/reminderProvider";
import { ErrorMessage } from "../../../styles/errorMessage";
import { colors } from "../../../styles/GlobalStyles";

interface IProps {
  open: boolean;
  setOpen: any;
  reminderDate: string;
  reminderId: string;
  day: any;
}

const ReminderModal: React.FC<IProps> = ({
  open,
  setOpen,
  day,
  reminderId,
}) => {
  const handleClose = () => setOpen(false);
  const [color, setColor] = useState("#039be5");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = React.useState<any>(moment(day, "DD-MM-YYYY"));
  const { setRefreshReminders } = useReminder();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${CONFIG.BACKEND_URL}/${reminderId}`);
        setCity(data.city);
        setColor(data.colorHex);
        setMessage(data.message);
        setDate(moment(data.date));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [open]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setErrorMessage("");

      await axios.put(`${CONFIG.BACKEND_URL}/${reminderId}`, {
        message,
        date,
        colorHex: color,
        city,
      });

      setRefreshReminders(`update ${reminderId}`);
      setOpen(false);
    } catch (error: any) {
      const rawErrorMessage = error.response.data.message;
      setErrorMessage(rawErrorMessage || "Error try again later.");
    }
  };

  const handleDelete = async () => {
    try {
      setErrorMessage("");

      await axios.delete(`${CONFIG.BACKEND_URL}/${reminderId}`);

      setRefreshReminders(`delete ${reminderId}`);
      setOpen(false);
    } catch (error: any) {
      const rawErrorMessage = error.response.data.message;
      setErrorMessage(rawErrorMessage || "Error try again later.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox>
        <ModalHead>
          <h3>Edit reminder</h3>
          <CloseButton onClick={handleClose}>
            <AiOutlineClose size={20} />
          </CloseButton>
        </ModalHead>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Message"
            variant="outlined"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={color}
            label="Color"
            onChange={(e) => setColor(e.target.value)}
          >
            <MenuItem value={"#039be5"}>Blue</MenuItem>
            <MenuItem value={"#0b8043"}>Green</MenuItem>
            <MenuItem value={"#f6bf26"}>Yellow</MenuItem>
            <MenuItem value={"#8e24aa"}>Purple</MenuItem>
          </Select>
          <TimePicker
            label="Hour"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          {errorMessage && (
            <ErrorMessage className="onSubmitErrorMessage">
              {errorMessage}
            </ErrorMessage>
          )}
          <Button
            style={{ background: colors.darkRed }}
            type="submit"
            variant="contained"
          >
            Save
          </Button>
          <Button
            style={{
              color: colors.darkRed,
              border: `1px solid ${colors.darkRed}`,
            }}
            onClick={() => handleDelete()}
            variant="outlined"
          >
            Delete
          </Button>
        </form>
      </ModalBox>
    </Modal>
  );
};

export default ReminderModal;
