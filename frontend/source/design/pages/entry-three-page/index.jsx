import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Arrow} from "../../assets/icons/arrow";
import {ButtonStyled} from "../../components/Entry/styled";
import {EntryThree} from "../../components/EntryThree";


export const EntryThreePage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Третий шаг записи";
    }, []);

    const goBack = (step) => () => {
        navigate(step);
    };

    return (
        <>
            <ButtonStyled
                onClick={goBack(-1)}
            >
                <Arrow/>
                назад
            </ButtonStyled>
            <EntryThree/>
        </>
    )
};

