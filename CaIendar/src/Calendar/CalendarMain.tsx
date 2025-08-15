import { PiListDashes } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverDirection } from "../serverDir/ServerDir";
import type {
  SpecialDayFromBackendInterface,
  SpecialDayInterface,
} from "../types/specialDayInterface";
import type { LeftMenuInterface } from "../types/refs";
import type { RepeatedDatesInterface } from "../types/repeatedDatesInterface";
import type { SelectedEventInterface } from "../types/SelectedEvent";

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

  const [actualDate, setActualDate] = useState<Date>(new Date());

  const [noInActualDate, setNoInActualDate] = useState<boolean>(false);

  const todayDate: number = today.getDate();

  const days: number[] = [];

  const lastDay = new Date(year, month + 1, 0).getDate();

  const langCode: string = navigator.language;

  const [language] = langCode.split("-");

  const displayNames = new Intl.DisplayNames(["en"], { type: "language" });

  const languageName: string = displayNames.of(language)!;

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

  const [doUserSelectedEvent, setDoUserSelectedEvent] =
    useState<SelectedEventInterface>({
      eventName: "",
      userSelected: false,
      countDays: 0,
      date: [],
    });

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
      setWasADaySelected(false);
      setAddSpecialDay(false);
    }
  }

  function goBackCalendar() {
    const newDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    setToday(newDate);
    setMonth(newDate.getMonth());
    checkIfNotInActualDate(newDate);
    checkIfInRepeatedDateBack();
  }

  function goNextCalendar() {
    const newDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    setToday(newDate);
    setMonth(newDate.getMonth());
    checkIfNotInActualDate(newDate);
    checkIfInRepeatedDateNext();
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

  function checkIfInRepeatedDateBack() {
    repeatedDates.map((date) => {
      date.specialDayDate.map((special) => {
        const specialFormatted = new Date(special);

        console.log(specialFormatted);

        if (
          today.getMonth() === specialFormatted.getMonth() &&
          today.getFullYear() === specialFormatted.getFullYear() &&
          doUserSelectedEvent.countDays - 1 >= 0
        ) {
          setDoUserSelectedEvent({
            ...doUserSelectedEvent,
            countDays: doUserSelectedEvent.countDays - 1,
          });
        }
      });
    });
  }

  function checkIfInRepeatedDateNext() {
    repeatedDates.map((date) => {
      date.specialDayDate.map((special) => {
        const specialFormatted = new Date(special);

        console.log(specialFormatted);

        if (
          today.getMonth() === specialFormatted.getMonth() &&
          today.getFullYear() === specialFormatted.getFullYear()
        ) {
          setDoUserSelectedEvent({
            ...doUserSelectedEvent,
            countDays: doUserSelectedEvent.countDays + 1,
          });
        }
      });
    });
  }

  function checkIfInRepeatedDateActual() {
    repeatedDates.map((date) => {
      date.specialDayDate.map((special, index) => {
        const specialFormatted = new Date(special);

        console.log(specialFormatted);

        if (
          today.getMonth() === specialFormatted.getMonth() &&
          today.getFullYear() === specialFormatted.getFullYear()
        ) {
          setDoUserSelectedEvent((prev) => ({
            ...prev,
            countDays: index,
          }));
        }
      });
    });
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

    setIsMenuOpen(false);
  }

  function closeSelectedDayTable() {
    setWasADaySelected(false);
    setAddSpecialDay(false);
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
      language: languageName.toLowerCase(),
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
        setRepeatedDates(
          res.data.map((item: RepeatedDatesInterface) => ({
            ...item,
            date: item.specialDayDate.map((d) => new Date(d)),
          }))
        );

        console.log("get repeated", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getRepeatedDayEvent(repeatedDay: string) {
    const repeated: SpecialDayFromBackendInterface[] = [];

    specialDays?.some((day) => {
      return day.specialDayName.includes(repeatedDay) && repeated.push(day);
    });
  }

  function searchEvents(text: string) {
    if (text.trim() !== "") {
      setRepeatedDates((prev) =>
        prev.filter((item) => item.repeatedDateName.includes(text))
      );
    } else {
      getRepeatedDates();
    }
  }

  function handleSelectedEvent(specialDay: RepeatedDatesInterface) {
    setDoUserSelectedEvent({
      eventName: specialDay.repeatedDateName,
      userSelected: true,
      countDays: 0,
      date: specialDay.specialDayDate,
    });

    checkIfInRepeatedDateActual();
  }
  console.log("CA", repeatedDates);

  function decreaseCountDays() {
    if (doUserSelectedEvent.countDays - 1 >= 0) {
      setDoUserSelectedEvent({
        ...doUserSelectedEvent,
        countDays: doUserSelectedEvent.countDays - 1,
      });

      const newDate: Date = new Date(
        doUserSelectedEvent.date[doUserSelectedEvent.countDays - 1]
      );

      setToday(newDate);
      setMonth(newDate.getMonth());
      checkIfNotInActualDate(newDate);
    }
  }

  function increaseCountDays() {
    const increasedIndex: number = doUserSelectedEvent.countDays + 1;

    if (increasedIndex <= doUserSelectedEvent.date.length - 1) {
      setDoUserSelectedEvent({
        ...doUserSelectedEvent,
        countDays: increasedIndex,
      });
      const newDate: Date = new Date(doUserSelectedEvent.date[increasedIndex]);

      console.log("REPIN", newDate);

      setToday(newDate);
      setMonth(newDate.getMonth());
      checkIfNotInActualDate(newDate);
    }
  }

  return (
    <div className="flex bg-black">
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
          className={`relative size-11 hover:cursor-pointer text-green-500 hover:text-gray-400 duration-300 transition`}
        ></PiListDashes>
      </span>

      <div
        className={`flex flex-col  h-screen border-2 border-green-500 border-l-0 border-t-0 border-b-0 transition duration-500 z-10 ${
          isMenuOpen ? "translate-x-0 w-100" : "translate-x-[-400px] w-100"
        }`}
        ref={leftMenuRef}
      >
        <div className="flex justify-center mt-14">
          <input
            className="w-[150px] text-center border-2 rounded-2xl"
            placeholder="Search bar..."
            onChange={(event) => searchEvents(event.target.value)}
          ></input>
        </div>

        <div className="text-center hover:cursor-pointer mt-14">
          {repeatedDates.map((repeated) => {
            return (
              <>
                {doUserSelectedEvent.userSelected &&
                doUserSelectedEvent.eventName === repeated.repeatedDateName ? (
                  <div
                    onClick={() =>
                      getRepeatedDayEvent(repeated.repeatedDateName)
                    }
                    className="border-2 border-r-0 border-l-0 p-[1px] h-30 bg-green-900 border-green-500 hover:bg-green-800 text-white transition duration-300 mb-3 "
                  >
                    <h2>Selected Event {repeated.repeatedDateName}</h2>

                    <div className="flex justify-center mt-8">
                      <FaArrowLeft onClick={decreaseCountDays} />
                      <h2 className="relative bottom-1.5 mr-2 ml-2 select-none">
                        {doUserSelectedEvent.countDays}
                      </h2>
                      <FaArrowRight onClick={increaseCountDays} />
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() =>
                      getRepeatedDayEvent(repeated.repeatedDateName)
                    }
                    className="border-2 border-r-0 border-l-0 p-[1px] border-green-400 bg-green-800 text-white hover:bg-green-950 hover:text-white transition duration-300 mb-3 "
                  >
                    <h2 onClick={() => handleSelectedEvent(repeated)}>
                      Event {repeated.repeatedDateName}
                    </h2>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>

      <div className="absolute left-1/2 top-4 transform -translate-x-1/2 text-center">
        <h1 className="text-3xl text-green-400">
          {today.toLocaleDateString(language, { month: "long" })}
        </h1>
        <h1 className="text-green-300">{today.getFullYear()}</h1>
      </div>

      <div
        className={`flex text-center place-content-center flex-wrap gap-5 p-8 mt-5 transition duration-500 ${
          isMenuOpen ? "translate-x-0 rotate-3" : "-translate-x-1/32"
        }
        ${wasADaySelected && "rotate-[-3deg]"}
        `}
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
              className="select-none w-full md:w-1/7 border-2 border-green-600 p-1 min-h-15 place-content-center shadow-lg hover:shadow-[0_5px_0] shadow-green-800 hover:shadow-green-600
               hover:rounded-2xl hover:rotate-x-30 hover:cursor-pointer hover:bg-green-950 hover:text-white duration-300"
            >
              {isSpecialDay && (
                <h5
                  className="text-3xl text-green-400 font-bold font-mono"
                  style={{ textShadow: "-3px 0px 1px green" }}
                >
                  {day}
                </h5>
              )}

              {!isSpecialDay && isToday && !noInActualDate && (
                <h5
                  style={{ textShadow: "-3px 0px 1px green" }}
                  className="text-3xl text-green-400 font-bold font-mono"
                >
                  {day}
                </h5>
              )}

              {!isSpecialDay && !isToday && !noInActualDate && (
                <h5
                  style={{ textShadow: "-3px 0px 2px green" }}
                  className="text-2xl text-green-200 font-mono"
                >
                  {day}
                </h5>
              )}

              {!isSpecialDay && !isToday && noInActualDate && (
                <h5
                  style={{ textShadow: "-3px 0px 1px green" }}
                  className="text-2xl text-green-200 font-mono"
                >
                  {day}
                </h5>
              )}

              {!isSpecialDay && isToday && noInActualDate && (
                <h5
                  style={{ textShadow: "-3px 0px 1px green" }}
                  className="text-2xl text-green-200 font-mono"
                >
                  {day}
                </h5>
              )}
            </div>
          );
        })}
      </div>

      <div
        className={`${
          !wasADaySelected ? "translate-x-[200px]" : "translate-x-[0px]"
        } transition duration-300 text-center h-screen border-green-400 rounded-2xl border-l-2 border-t-2 border-b-2 border-2 border-b-0 z-10 p-4`}
      >
        <>
          <h1 className="text-3xl text-green-300">{dateSelected?.getDate()}</h1>
          <h1 className="text-2xl text-green-300">
            {dateSelected?.toLocaleDateString(language, { weekday: "long" })}
          </h1>

          <hr className="text-green-400"></hr>

          <h1 className="text-2xl text-green-300">
            {dateSelected?.toLocaleDateString(language, { month: "long" })}
          </h1>
          <h1 className="text-2xl mt-2 text-green-300">
            {dateSelected?.getFullYear()}
          </h1>

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
                className="text-center border-2 border-green-400 text-green-300 mt-5 h-7 w-[170px] rounded-sm"
                placeholder="Your special day name"
              ></input>

              <button className="bg-green-500 border-2 rounded-lg border-green-400 p-2 mt-5 cursor-pointer duration-200 hover:bg-green-300">
                Save this date as forever
              </button>

              <br></br>

              <button
                className="bg-green-500 border-2 rounded-xl border-green-400 p-2 mt-5 cursor-pointer duration-200 hover:bg-green-300"
                onClick={() => addSpecialDayToCalendar(dateSelected!)}
              >
                Save
              </button>

              <br></br>

              <button
                onClick={removeSpecialDay}
                className="bg-rose-500 rounded-lg p-1.5 mt-6 cursor-pointer duration-200 hover:bg-rose-400"
              >
                Discard
              </button>
            </div>
          ) : (
            <button
              onClick={addSpecialDayButton}
              className="text-white hover:bg-green-600 transition duration-300 bg-green-800 p-2 border-2 border-green-500 rounded-2xl mt-5 cursor-pointer"
            >
              Add special date
            </button>
          )}

          <button
            onClick={closeSelectedDayTable}
            className="text-white hover:bg-green-600 transition duration-300 bg-green-800 p-2 border-2 border-green-500 rounded-2xl mt-5 cursor-pointer"
          >
            Close this tab
          </button>

          <div>
            <hr className="w-[100%]"></hr>
          </div>
        </>
      </div>
      <IoIosArrowBack
        onClick={goBackCalendar}
        className={`md:absolute fixed text-7xl md:text-3xl text-green-400 hover:text-green-700 cursor-pointer transition duration-500
        top-1/2 -translate-y-1/2
    ${isMenuOpen ? "md:left-[245px] left-2" : "md:left-0 left-2"}
  `}
      ></IoIosArrowBack>

      <IoIosArrowForward
        onClick={goNextCalendar}
        className={`${
          wasADaySelected && !addSpecialDay && "translate-x-[-100px] size-9"
        } ${
          wasADaySelected && addSpecialDay && "translate-x-[-145px] size-9"
        } ${
          !wasADaySelected ? "size-15" : ""
        } mr-30 duration-500 md:absolute fixed self-center right-1 hover:cursor-pointer text-green-400 hover:text-green-700`}
      ></IoIosArrowForward>

      {noInActualDate && (
        <button
          onClick={goToActualDate}
          className="absolute left-1/2 bottom-6 transform -translate-x-1/2 text-center hover:cursor-pointer border-2 p-2 bg-green-700 text-white transition duration-400 border-green-400 hover:bg-green-900"
        >
          Go to actual date
        </button>
      )}
    </div>
  );
}
