import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Arrow} from "../../assets/icons/arrow";
import {ButtonStyled} from "../../components/Entry/styled";
import {EntryTwo} from "../../components/EntryTwo";


export const EntryTwoPage = () => {

    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Второй шаг записи";
    }, []);

    const goBack = (step) => () => {
        navigate(step);
    };

    return(
        <div>
            <ButtonStyled onClick={goBack(-1)}><Arrow/>назад</ButtonStyled>
            <EntryTwo/>
        </div>
    )
};

