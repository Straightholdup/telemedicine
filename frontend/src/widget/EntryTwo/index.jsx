import React, {useEffect, useState} from 'react';
import {EntryContainer,} from "../Entry/styled";
import {
    ButtonDisabledStyled,
    ButtonStyled,
    ContactForm,
    ContactFormInner,
    ContactFormItem,
    ContactFormTitle,
    Steps
} from "./styled";
import Input from 'react-phone-number-input/input'
import 'react-phone-number-input/style.css'
import ru from 'react-phone-number-input/locale/ru.json'
import {useNavigate} from "react-router-dom";
import {EntryInfo} from "../EntryInfo";
import {useSelector} from "react-redux";
import {showInfoMessage} from "../Notification/TriggerNotification";

export const EntryTwo = () => {
    const navigate = useNavigate();

    const profile = useSelector(state => state.profile.profileData);
    const [flag, setFlag] = useState(false);

    const [formName, setFormName] = useState(profile.full_name);
    const [formNumber, setFormNumber] = useState(profile.phone);
    const [formMail, setFormMail] = useState(profile.email);


    const goToNextStep = () => {
        navigate("/entry-three");
    };

    const saveData = (e, func) => {
        const value = e.target.value;
        func(value);
    };

    useEffect(() => {
        if (formName && formNumber) {
            setFlag(true);
        } else {
            setFlag(false);
        }
    }, [formName, formNumber]);

    return (
        <EntryContainer>
            <EntryInfo/>
            <ContactForm>
                <ContactFormTitle>Проверьте Ваши Данные</ContactFormTitle>
                <ContactFormInner>
                    <ContactFormItem>
                        <label htmlFor="input1">Имя и фамилия пациента*</label>
                        <input
                            placeholder="Введите имя"
                            required
                            id="input1"
                            value={formName}
                            onChange={(e) => saveData(e, setFormName)}
                        />
                    </ContactFormItem>
                    <ContactFormItem>
                        <label htmlFor="input2">Телефон*</label>
                        <Input
                            country="KZ"
                            placeholder="Введите телефон"
                            labels={ru}
                            defaultCountry="KZ"
                            international
                            withCountryCallingCode
                            value={formNumber}
                            maxLength="15"
                            onChange={setFormNumber}
                        />
                    </ContactFormItem>
                    <ContactFormItem>
                        <label htmlFor="input3">Email</label>
                        <input
                            id="input3"
                            placeholder="Введите почту"
                            type="email"
                            value={formMail}
                            onChange={(e) => saveData(e, setFormMail)}
                        />
                    </ContactFormItem>
                    <ContactFormItem>
                        <label htmlFor="input4">Промокод</label>
                        <input
                            id="input4"
                            placeholder="Введите промокод"
                        />
                    </ContactFormItem>
                </ContactFormInner>
            </ContactForm>
            <Steps>Шаг 2 из 3</Steps>
            {
                flag
                    ? < ButtonStyled
                        onClick={goToNextStep}
                    >Продолжить
                    </ButtonStyled>
                    : <ButtonDisabledStyled
                        onClick={() => showInfoMessage("Заполните обязательные поля")}
                    >Продолжить
                    </ButtonDisabledStyled>
            }
        </EntryContainer>
    )
};