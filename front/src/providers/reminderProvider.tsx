import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CONFIG } from "../config";

interface IValue {
  setRefreshReminders: React.Dispatch<React.SetStateAction<any>>;

  reminders: any;
}

const ReminderContext = createContext({} as IValue);

export const ReminderProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [reminders, setReminders] = useState([] as any[]);
  const [refreshReminders, setRefreshReminders] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${CONFIG.BACKEND_URL}`);

        setReminders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refreshReminders]);

  const value = useMemo(
    () => ({
      reminders,
      setRefreshReminders,
    }),
    [reminders, setRefreshReminders]
  );

  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
};

export const useReminder = () => useContext(ReminderContext);
