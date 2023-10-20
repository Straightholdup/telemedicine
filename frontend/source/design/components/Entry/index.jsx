import React, {useEffect, useState} from 'react';
import {
    CalendarWrapper,
    EntryContainer,
    ErrorMessage,
    H4Styled,
    SelectedTime,
    TimeItem,
    TimeItems,
    TimeWrapper
} from "./styled";
import Calendar from "react-calendar";
import './calendar.css';
import {useNavigate} from "react-router-dom";
import {ButtonDisabledStyled, ButtonStyled, Steps} from "../EntryTwo/styled";
import {EntryInfo} from "../EntryInfo";
import {showErrorMessage, showInfoMessage} from "../Notification/TriggerNotification";
import {useDispatch, useSelector} from "react-redux";
import {API_URL} from "../../variables";
import dayjs from "dayjs";
import {setRequestId} from "../../../feature/RequestSlice";


export const Entry = () => {
    const [flag, setFlag] = useState(false);
    const [flagShowError, setFlagShowError] = useState(false);
    const [value, setValue] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const selectedTimeTextCondition = selectedTime && `Вы выбрали ${selectedTime.time}`;
    const selectedDoctor = useSelector(state => state.categories.selectedDoctor);

    const handleSaveSelectedTime = (time) => () => {
        setSelectedTime(time);
        setFlag(true);
    }

    const getTimesByDay = () => {
        setFlagShowError(false);
        const date = dayjs(value).format("YYYY-MM-DD")
        const body = {
            "doctor_id": selectedDoctor.id,
            "date": date,
        }
        fetch(`${API_URL}/doctor/get_time/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Доступное время не получено!");
                }
                return response.json();
            })
            .then(data => {
                setAvailableTimes(data.available_times);
                setFlagShowError(true);
            })
            .catch(err => {
                showErrorMessage(err.toString().replace("Error:", ""));
            })
    }

    const createOrder = () => {
        const body = {
            "doctor_id": selectedDoctor.id,
            "schedule_id": selectedTime.id
        }
        fetch(`${API_URL}/request/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${ localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Заявка не создана!");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                dispatch(setRequestId(data.request_id))
            })
            .catch(err => {
                showErrorMessage(err.toString().replace("Error:", ""));
            })
    }

    useEffect(() => {
        if (value !== "") {
            getTimesByDay();
        }
    }, [value]);


    const goToNextStep = () => {
        createOrder();
        navigate("/entry-two");
    }

    return (
        <EntryContainer>
            <EntryInfo/>
            <CalendarWrapper>
                <div style={{width: "100%"}}>
                    <H4Styled>Выберите день на который вы хотите записаться</H4Styled>
                    <Calendar onChange={setValue} value={value}/>
                </div>
                {
                    flagShowError &&
                    <TimeWrapper>
                        <H4Styled>Выберите Доступное Время</H4Styled>
                        {
                            availableTimes.length === 0
                                ? <ErrorMessage>Нет доступного времени</ErrorMessage>
                                : <TimeItems>

                                    {availableTimes?.map((item, index) => (
                                        <TimeItem
                                            key={index}
                                            onClick={handleSaveSelectedTime(item)}
                                        >{item.time}
                                        </TimeItem>
                                    ))}
                                </TimeItems>
                        }
                        <SelectedTime>
                            {selectedTimeTextCondition}
                        </SelectedTime>
                    </TimeWrapper>
                }


            </CalendarWrapper>
            <Steps>Шаг 1 из 3</Steps>
            {
                flag
                    ? < ButtonStyled onClick={goToNextStep}>Продолжить</ButtonStyled>
                    : <ButtonDisabledStyled
                        onClick={() => showInfoMessage("Выберите Время")}>
                        Продолжить
                    </ButtonDisabledStyled>
            }
        </EntryContainer>
    )
};