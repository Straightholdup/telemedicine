import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Arrow} from "../../app/styles/icons/arrow";
import {ButtonStyled} from "../../widget/Entry/styled";
import {EntryThree} from "../../widget/EntryThree";


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

