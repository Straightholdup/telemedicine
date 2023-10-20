import React, {useEffect, useState} from "react";
import {Success} from "../../assets/icons/success";
import {SuccessContainer, SuccessTitle} from "./styled";
import {useNavigate} from "react-router-dom";

export const SuccessEntry = () => {
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setSeconds(0);
        }
    }, [seconds]);

    const navigate = useNavigate();
        setTimeout(()=>{
            navigate("/profile");
        },(5000))

    return(
        <SuccessContainer>
            <SuccessTitle>
                Поздравляем! Вы записались на онлайн - консультацию по телемедицине.
                Перейдите в свой профиль, чтобы узнать подробности.
                Вы будете перенаправлены на страницу профиля через - {seconds}
            </SuccessTitle>
            <Success/>
        </SuccessContainer>
    )
}