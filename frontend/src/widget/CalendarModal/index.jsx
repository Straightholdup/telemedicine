import React, {useEffect, useState} from "react";
import './style.css';
import {CloseIcon} from "../../app/styles/icons/close";
import {ButtonStyled} from "../EntryTwo/styled";
import {API_URL, availableTimesModal} from "../../variables";
import {showErrorMessage, showSuccessMessage} from "../Notification/TriggerNotification";

export const CalendarModal = ({setShowModal, showModal}) => {
    const [time, setTime] = useState([]);

    const handleAllChecked = (rowIndex) => (e) =>{
        const {checked} = e.target;
            setTime((prev) =>
                prev.map((row, i) => {
                    if (i === rowIndex) {
                        return {
                            ...row,
                            items: row.items.map((col, index) => {
                                return {...col, flag: checked};
                            })
                        };
                    } else {
                        return row;
                    }
                })
            );
    };

    const handleChange = (rowIndex, colIndex) => (e) => {
        const {checked} = e.target;
            setTime((prev) =>
                prev.map((row, i) => {
                    if (i === rowIndex) {
                        return {
                            ...row,
                            items: row.items.map((col, index) => {
                                if (index === colIndex) {
                                    return {...col, flag: checked};
                                } else {
                                    return col;
                                }
                            })
                        };
                    } else {
                        return row;
                    }
                })
            );
    };

    const sendForm = (e) => {
        e.preventDefault();
        const body = {
            "schedule": time
        }
        fetch(`${API_URL}/schedule/doctor/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${ localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Список доступного календаря не сформирован!");
                }
                return response.json();
            })
            .then(data => {
              console.log(data);
              showSuccessMessage("Доступное Время успешно создано!")
                setShowModal(false);
            })
            .catch(err => {
                showErrorMessage(err.toString().replace("Error:", ""));
            })

    };

    useEffect(() => {
        setTime(availableTimesModal);
    }, []);


    return (
        <>
            <div className="overlay_modal"/>
            <div className="modal">
                <div className="modal-inner">
                    <h4 className="modal-title">Выберите свое свободное время</h4>
                    <div className="modal-calendar-wrapper">
                        <div>
                            <div style={{display: "flex"}}>
                                {time?.map((row, index) => (
                                    <div className="row" key={index}>
                                        <h3>{row.day_ru}</h3>
                                        <div className="col" key={index}>
                                            <input
                                                type="checkbox"
                                                onClick={handleAllChecked(index)}
                                            />
                                            <label>Выбрать все</label>
                                        </div>
                                        {row.items.map((col, colIndex) => (
                                            <div className="col" key={colIndex}>
                                                <input
                                                    type="checkbox"
                                                    checked={col?.flag ?? false}
                                                    name={col?.time}
                                                    onChange={handleChange(index, colIndex)}
                                                />
                                                <label>{col.time}</label>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="send-button">
                                <ButtonStyled onClick={sendForm}>
                                    Отправить
                                </ButtonStyled>
                            </div>

                        </div>
                    </div>
                    <button
                        className="modal-button-close"
                        onClick={() => setShowModal(!showModal)}
                    >
                        <CloseIcon width="32px" height="32px" color="#D2DADF"/>
                    </button>
                </div>
            </div>
        </>
    )
}