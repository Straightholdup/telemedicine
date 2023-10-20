import React, {useEffect, useState} from "react";
import {
    ButtonSecondStyled,
    ButtonStyled,
    FormStyled,
    H1Styled,
    InputStyled,
    SecondaryText,
    SelectStyled,
    SymptomsItem,
    TextAreaStyled
} from "./styled";
import {API_URL} from "../../variables";
import {showErrorMessage, showInfoMessage, showSuccessMessage,} from "../Notification/TriggerNotification";
import ru from 'react-phone-number-input/locale/ru.json'
import Input from "react-phone-number-input/input";

export const Registration = ({setCurrentTab}) => {
    const [doctorSpecialization, setDoctorSpecialization] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [createdFullName, setCreatedFullName] = useState("");
    const [createdPassword, setCreatedPassword] = useState("");
    const [createdMail, setCreatedMail] = useState("");
    const [birthDate, setBirthdate] = useState("");
    const [phone, setPhone] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");


    /*secondary state*/
    const [createdProfile, setCreatedProfile] = useState(0);
    const [education, setEducation] = useState({
        startDate: "",
        endDate: "",
        place: "",
        title: ""
    });
    const [description, setDescription] = useState("");
    const [experience, setExperience] = useState([]);
    const [startExp, setStartExp] = useState("");
    const [endExp, setEndExp] = useState("");
    const [titleExp, setTitleExp] = useState("");
    const [symptom_ids, setSymptom_ids] = useState([]);


    const handleOnChangeEducation = (e) => {
        const educationName = e.target.name;
        const educationValue = e.target.value;
        setEducation({...education, [educationName]: educationValue});
    }

    const addExperience = (e) => {
        const expression = titleExp.trim().length !== 0 || startExp.trim().length !== 0 || endExp.trim().length !== 0;
        if (expression) {
            setExperience({
                ...experience, [startExp + " " + endExp]: titleExp
            });
            setTitleExp("");
            setEndExp("");
            setStartExp("");
        } else {
            showInfoMessage("Поля опыта не могут быть пустыми!");
        }
    };

    const handleAddSymptoms = (event) => {
        let updatedList = [...symptom_ids];
        if (event.target.checked) {
            updatedList = [...symptom_ids, event.target.value];
        } else {
            updatedList.splice(symptom_ids.indexOf(event.target.value), 1);
        }
        setSymptom_ids(updatedList.map(item => +item));
    };


    const getSpecializationList = () => {
        fetch(`${API_URL}/specializations/`)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Список Специализаций не получены!")
                }
                return response.json();
            })
            .then(data => {
                setDoctorSpecialization(data);
            })
            .catch(err => {
                showErrorMessage(err.toString().replace("Error:", ""));
            })
    };

    const getSymptoms = () => {
        fetch(`${API_URL}/symptoms/`)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Список Симптомов не получены!")
                }
                return response.json();
            })
            .then(data => {
                setSymptoms(data);
            })
            .catch(err => {
                showErrorMessage(err.toString().replace("Error:", ""));
            })
    };


    const createUserForm = (e) => {
        e.preventDefault();

        const body = {
            "email": createdMail,
            "password": createdPassword,
            "phone": phone,
            "full_name": createdFullName,
            "birth_date": birthDate,
            "is_doctor": Boolean(isDoctor),
        }

        const bodyDoctor = {
            "email": createdMail,
            "password": createdPassword,
            "phone": phone,
            "full_name": createdFullName,
            "birth_date": birthDate,
            "is_doctor": Boolean(isDoctor),
            "education": {
                [education.startDate + " " + education.endDate]: {
                    "place": education.place,
                    "title": education.title,
                }
            },
            "experience": experience,
            "description": description,
            "specialization_id": Number(createdProfile),
            "symptom_ids": symptom_ids
        }

        fetch(`${API_URL}/auth/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(!isDoctor ? body : bodyDoctor)
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Одно из полей заполнено неправильно!")
                }
                return response.json();
            })
            .then(data => {
                showSuccessMessage("Пользователь создан!")
                setSaved(true);
            })
            .catch(err => {
                setError(err.toString().replace("Error:", ""));
                showErrorMessage("Пользователь не создан!");
            })
    };

    useEffect(() => {
        if (saved) {
            setTimeout(() => {
                setCurrentTab("Авторизация");
            }, 2000)
        }
    }, [saved]);


   /* useEffect(() => {
        if (isDoctor === true) {
            setCreatedProfile(0);
        }
    }, [isDoctor]);*/


    useEffect(() => {
        getSpecializationList();
        getSymptoms();
    }, [])

    return (
        <FormStyled>
            <div>
                <label htmlFor="1Input">
                    <H1Styled>ФИО</H1Styled>
                </label>
                <InputStyled
                    required
                    id="1Input"
                    onChange={(e) => setCreatedFullName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="2Input">
                    <H1Styled>Пароль</H1Styled>
                </label>
                <InputStyled
                    required
                    id="2Input"
                    onChange={(e) => setCreatedPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="3Input">
                    <H1Styled>Почта</H1Styled>
                </label>
                <InputStyled
                    required
                    id="3Input"
                    type="email"
                    onChange={(e) => setCreatedMail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="4Input">
                    <H1Styled>Телефон</H1Styled>
                </label>
                <Input
                    country="KZ"
                    className="phone_reg"
                    placeholder="Введите телефон"
                    labels={ru}
                    defaultCountry="KZ"
                    international
                    withCountryCallingCode
                    value={phone}
                    maxLength="15"
                    onChange={setPhone}
                />
            </div>
            <div>
                <label htmlFor="4Input">
                    <H1Styled>Дата Рождения</H1Styled>
                </label>
                <InputStyled
                    required
                    id="4Input"
                    type="date"
                    onChange={(e) => setBirthdate(e.target.value)}
                />
            </div>
            <div>
                <label>
                    <H1Styled>Вид Пользователя</H1Styled>
                </label>
                <SelectStyled onChange={(e) => setIsDoctor(e.target.value)}>
                    <option value="false" selected>Как Пациент</option>
                    <option value="true">Как Врач</option>
                </SelectStyled>
            </div>
            {
                isDoctor === "true" &&
                <>
                    <div>
                        <label htmlFor="5Input">
                            <H1Styled>Профиль</H1Styled>
                        </label>
                        <SelectStyled onChange={(e) => setCreatedProfile(e.target.value)}>
                            <option
                                value="test"
                            >
                                Выберите профиль
                            </option>
                            {
                                doctorSpecialization?.map((item, index) => (
                                    <option key={index}
                                            value={item.id}
                                    >
                                        {item.type}
                                    </option>
                                ))
                            }
                        </SelectStyled>
                    </div>
                    <div>
                        <label htmlFor="6Input">
                            <H1Styled>Обучение</H1Styled>
                        </label>
                        <div>
                            <div>
                                <label>С</label>
                                <InputStyled
                                    required
                                    id="4Input"
                                    value={education.startDate}
                                    type="month"
                                    name="startDate"
                                    onChange={handleOnChangeEducation}
                                />
                            </div>
                            <div>
                                <label>По</label>
                                <InputStyled
                                    required
                                    id="4Input"
                                    type="month"
                                    value={education.finishDate}
                                    name="endDate"
                                    onChange={handleOnChangeEducation}
                                />
                            </div>
                            <div>
                                <label>Университет</label>
                                <InputStyled
                                    required
                                    id="4Input"
                                    value={education.place}
                                    name="place"
                                    onChange={handleOnChangeEducation}
                                />
                            </div>
                            <div>
                                <label>Специальность</label>
                                <InputStyled
                                    required
                                    id="4Input"
                                    value={education.title}
                                    name="title"
                                    onChange={handleOnChangeEducation}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="6Input">
                            <H1Styled>Опыт Работы</H1Styled>
                        </label>
                        <div>
                            <div>
                                <label>С</label>
                                <InputStyled
                                    required
                                    id="4Input"
                                    value={startExp}
                                    type="month"
                                    name="startDate"
                                    onChange={(e) => setStartExp(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>По</label>
                                <InputStyled
                                    required
                                    id="4Input"
                                    type="month"
                                    value={endExp}
                                    name="endDate"
                                    onChange={(e) => setEndExp(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Место Работы</label>
                                <InputStyled
                                    required
                                    id="4Input"
                                    value={titleExp}
                                    name="place"
                                    onChange={(e) => setTitleExp(e.target.value)}
                                />
                            </div>
                        </div>
                        <ButtonSecondStyled onClick={addExperience}>Добавить опыт работы</ButtonSecondStyled>
                        <SecondaryText>{experience && `Добавлено ${Object.keys(experience).length} мест работы`}</SecondaryText>
                    </div>
                    <div>
                        <label htmlFor="6Input">
                            <H1Styled>Выберите симтомы, которые вы можете лечить</H1Styled>
                        </label>
                        {
                            symptoms?.map((item, index) => (
                                <SymptomsItem key={index}>
                                    <input
                                        type="checkbox"
                                        value={item.id}
                                        onChange={handleAddSymptoms}
                                    />
                                    <label> {item.name}</label>
                                </SymptomsItem>
                            ))
                        }
                    </div>
                    <div>
                        <label htmlFor="6Input">
                            <H1Styled>Описание</H1Styled>
                        </label>
                        <TextAreaStyled
                            required
                            id="6Input"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </>
            }
            <div>
                <ButtonStyled onClick={(e) => createUserForm(e)}>Создать</ButtonStyled>
            </div>
            {saved && <p>Сохранено ✔</p>}
            <div style={{color: "#B30047"}}>{error}</div>
        </FormStyled>
    )
}
