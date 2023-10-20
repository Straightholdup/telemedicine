import React, {useEffect} from "react";
import {Entry} from "../../components/Entry";
import {useNavigate} from "react-router-dom";
import {Arrow} from "../../assets/icons/arrow";
import {ButtonStyled} from "../../components/Entry/styled";


export const EntryPage = () => {

    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Первый шаг записи";
    }, []);

    const goBack = (step) => () => {
        navigate(step);
    };

    return(
        <div>
            <ButtonStyled onClick={goBack(-1)}><Arrow/>назад</ButtonStyled>
            <Entry/>
        </div>
    )
};

