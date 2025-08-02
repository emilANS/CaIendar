import { PiListDashes } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverDirection } from "../serverDir/ServerDir";
import type {
  SpecialDayFromBackendInterface,
  SpecialDayInterface,
} from "../types/specialDayInterface";
import type { LeftMenuInterface } from "../types/refs";
import type { RepeatedDatesInterface } from "../types/repeatedDatesInterface";

export default function CalendarMain() {
  // UseRefs
  const leftMenuRef = useRef<HTMLDivElement>(null);

  const [sizeLeftMenu, setSizeLeftMenu] = useState<LeftMenuInterface>({
    width: 0,
    height: 0,
  });

  // UI
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [today, setToday] = useState<Date>(new Date());
  const year: number = today.getFullYear();
  const [month, setMonth] = useState<number>(today.getMonth());

  const [actualDate] = useState<Date>(new Date());

  const [noInActualDate, setNoInActualDate] = useState<boolean>(false);

  const todayDate: number = today.getDate();

  const days: number[] = [];

  const lastDay = new Date(year, month + 1, 0).getDate();

  const language: string = navigator.language;

  // Selected date useStates
  const [dateSelected, setDateSelected] = useState<Date | null>(null);

  const [wasADaySelected, setWasADaySelected] = useState<boolean>(false);

  const [addSpecialDay, setAddSpecialDay] = useState<boolean>(false);

  const [newSpecialDayText, setNewSpecialDayText] = useState<string>("");

  const [specialDays, setSpecialDays] = useState<
    SpecialDayFromBackendInterface[] | null
  >(null);

  const idOfUser = parseInt(sessionStorage.getItem("idOfUser")!);

  const [repeatedDates, setRepeatedDates] = useState<
    RepeatedDatesInterface[] | []
  >([]);

  useEffect(() => {
    getSpecialDaysOfUser();

    getRepeatedDates();
  }, []);

  useEffect(() => {
    if (leftMenuRef.current) {
      const rect = leftMenuRef.current.getBoundingClientRect();
      setSizeLeftMenu({ width: rect.width, height: rect.height });
    }
  }, [isMenuOpen]);

  for (let day = 1; day <= lastDay; day++) {
    days.push(new Date(year, month, day).getDate());
  }

  function changeMenuBoolValue() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }

  function goBackCalendar() {
    const newDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    setToday(newDate);
    setMonth(newDate.getMonth());
    checkIfNotInActualDate(newDate);
  }

  function goNextCalendar() {
    const newDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    setToday(newDate);
    setMonth(newDate.getMonth());
    checkIfNotInActualDate(newDate);
  }

  function checkIfNotInActualDate(newDate: Date) {
    if (
      newDate.getMonth() !== actualDate.getMonth() ||
      newDate.getFullYear() !== actualDate.getFullYear()
    ) {
      setNoInActualDate(true);
    } else {
      goToActualDate();
    }
  }

  function goToActualDate() {
    setToday(actualDate);
    setMonth(actualDate.getMonth());
    setNoInActualDate(false);
  }

  function selectDate(date: number) {
    const dateSelected: Date = new Date();

    dateSelected.setFullYear(year);

    dateSelected.setMonth(month);

    dateSelected.setDate(date);

    setDateSelected(dateSelected);

    setWasADaySelected(true);
  }

  function closeSelectedDayTable() {
    setWasADaySelected(false);

    setDateSelected(null);
  }

  function addSpecialDayButton() {
    setAddSpecialDay(true);
  }

  function addSpecialDayToCalendar(date: Date) {
    const specialDayObject: SpecialDayInterface = {
      date: date.toLocaleDateString("en-CA").split("T")[0],
      specialDayContent: newSpecialDayText,
      idOfUser: idOfUser,
    };

    axios
      .post(`${serverDirection}/createSpecialDay`, specialDayObject)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function removeSpecialDay() {
    setNewSpecialDayText("");

    setAddSpecialDay(false);
  }

  function getSpecialDaysOfUser() {
    axios
      .post(`${serverDirection}/showUserSpecialDays`, { id: idOfUser })
      .then((res) => {
        setSpecialDays(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getRepeatedDates() {
    axios
      .post(`${serverDirection}/getRepeatedDates`, { id: idOfUser })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // console.log("Special days",specialDays?.map(a => console.log(new Date(a.specialDayDate + "T12:00:00"))));

  return (
    <div className="flex">
      <span
        onClick={changeMenuBoolValue}
        style={{
          transform: isMenuOpen
            ? `translateX(${sizeLeftMenu.width / 2.5}px)`
            : "translateX(0)",
        }}
        className="absolute inline-block transition-transform duration-500 cursor-pointer z-20"
      >
        <PiListDashes
          className={`relative size-11 hover:cursor-pointer hover:text-gray-400 duration-300 transition`}
        ></PiListDashes>
      </span>

      <div
        className={`h-screen border-2 border-t-0 border-b-0 transition duration-500 z-10 ${
          isMenuOpen ? "translate-x-0 w-100" : "translate-x-[-400px] w-100"
        }`}
        ref={leftMenuRef}
      >
        <div className="text-center hover:cursor-pointer">
          <h2 className="border-2 border-r-0 border-l-0 hover:bg-black hover:text-white transition duration-300 mt-12">
            See all your plans
          </h2>
          <h2 className="border-2 border-r-0 border-l-0 border-t-0 hover:bg-black hover:text-white transition duration-300">
            See all festive days
          </h2>
          <h2 className="border-2 border-r-0 border-l-0  border-t-0 hover:bg-black hover:text-white transition duration-300">
            See all birthdays
          </h2>
        </div>
      </div>

      <div className="absolute left-1/2 top-4 transform -translate-x-1/2 text-center">
        <h1 className="text-3xl">
          {today.toLocaleDateString(language, { month: "long" })}
        </h1>
        <h1>{today.getFullYear()}</h1>
      </div>

      <div
        className={`flex text-center place-content-center flex-wrap gap-5 p-8 mt-5 transition duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-1/32"
        }`}
      >
        {days.map((day) => {
          const isSpecialDay = specialDays?.some((specialDay) => {
            const formattedSpecialDay = new Date(
              specialDay.specialDayDate + "T12:00:00"
            );
            return (
              formattedSpecialDay.getDate() === day &&
              formattedSpecialDay.getMonth() === month
            );
          });

          const isToday = day === todayDate;

          return (
            <div
              onClick={() => selectDate(day)}
              className="select-none w-1/7 border-2 border-black-600 p-1 min-h-15 place-content-center hover:cursor-pointer hover:bg-black hover:text-white transition duration-300"
            >
              {isSpecialDay && (
                <h5 className="text-3xl text-cyan-300 font-bold font-mono">
                  {day}
                </h5>
              )}

              {!isSpecialDay && isToday && !noInActualDate && (
                <h5 className="text-3xl font-bold font-mono">{day}</h5>
              )}

              {!isSpecialDay && !isToday && !noInActualDate && (
                <h5 className="text-2xl font-mono">{day}</h5>
              )}

              {!isSpecialDay && !isToday && noInActualDate && (
                <h5 className="text-2xl font-mono">{day}</h5>
              )}

              {!isSpecialDay && isToday && noInActualDate && (
                <h5 className="text-2xl font-mono">{day}</h5>
              )}
            </div>
          );
        })}
      </div>

      <div
        className={`${
          !wasADaySelected ? "translate-x-[200px]" : "translate-x-[0px]"
        } transition duration-300 text-center h-screen border-2 border-t-0 border-b-0 z-10 p-4`}
      >
        <>
          <h1 className="text-3xl">{dateSelected?.getDate()}</h1>
          <h1 className="text-2xl">
            {dateSelected?.toLocaleDateString(language, { weekday: "long" })}
          </h1>
          <h1 className="text-2xl">
            {dateSelected?.toLocaleDateString(language, { month: "long" })}
          </h1>
          <h1 className="text-2xl mt-2">{dateSelected?.getFullYear()}</h1>

          {specialDays?.map((specialDay) => {
            const formattedSpecialDay = new Date(
              specialDay.specialDayDate + "T12:00:00"
            );

            if (formattedSpecialDay.getDate() === dateSelected?.getDate()) {
              return (
                <div>
                  <h2>{specialDay.specialDayName}</h2>
                </div>
              );
            }
          })}

          {addSpecialDay ? (
            <div>
              <input
                onChange={(event) => setNewSpecialDayText(event.target.value)}
                className="text-center border-2 border-gray-500 mt-5 h-7 w-[150px]"
                placeholder="Your special day"
              ></input>

              <button
                className="bg-green-200 p-2 mt-5"
                onClick={() => addSpecialDayToCalendar(dateSelected!)}
              >
                Save
              </button>

              <br></br>

              <button
                onClick={removeSpecialDay}
                className="bg-rose-300 rounded-lg p-1.5 mt-6"
              >
                Discard
              </button>
            </div>
          ) : (
            <button
              onClick={addSpecialDayButton}
              className="text-white hover:bg-gray-700 transition duration-300 bg-gray-900 p-2 border-2 border-white rounded-2xl mt-5 cursor-pointer"
            >
              Add special date
            </button>
          )}

          <button
            onClick={closeSelectedDayTable}
            className="text-white hover:bg-gray-800 transition duration-300 bg-gray-900 p-2 border-2 border-white rounded-2xl mt-5 cursor-pointer"
          >
            Close this tab
          </button>
        </>
      </div>

      <IoIosArrowBack
        onClick={goBackCalendar}
        className={`left-0 absolute self-center size-9 hover:cursor-pointer hover:text-gray-400 ${
          isMenuOpen
            ? "translate-x-[245px] duration-500"
            : "translate-x-[0px] duration-700"
        }`}
      ></IoIosArrowBack>

      <IoIosArrowForward
        onClick={goNextCalendar}
        className={`${
          wasADaySelected && "translate-x-[-200px]"
        } transition duration-300 absolute self-center right-1 size-9 hover:cursor-pointer hover:text-gray-400`}
      ></IoIosArrowForward>

      {noInActualDate && (
        <button
          onClick={goToActualDate}
          className="absolute left-1/2 bottom-6 transform -translate-x-1/2 text-center hover:cursor-pointer border-2 p-2 bg-gray-700 text-white transition duration-400 hover:bg-gray-950"
        >
          Go to actual date
        </button>
      )}
    </div>
  );
}
