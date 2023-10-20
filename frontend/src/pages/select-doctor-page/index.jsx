import React, {useEffect} from 'react';
import {ListOfDoctorByDisease} from "../../widget/ListOfDoctorByDisease";
import {Help} from "../../widget/Help";
import {ButtonStyled} from "../../widget/Entry/styled";
import {Arrow} from "../../app/styles/icons/arrow";
import {useNavigate} from "react-router-dom";

export const SelectDoctorPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Выбор Врача";
    }, [])

    const goBack = (step) => () => {
        navigate(step);
    };

    return (
        <>
            <ButtonStyled onClick={goBack(-1)}><Arrow/>назад</ButtonStyled>
            <ListOfDoctorByDisease/>
            <Help/>
        </>
    )
};