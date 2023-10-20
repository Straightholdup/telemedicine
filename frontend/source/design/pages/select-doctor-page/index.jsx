import React, {useEffect} from 'react';
import {ListOfDoctorByDisease} from "../../components/ListOfDoctorByDisease";
import {Help} from "../../components/Help";
import {ButtonStyled} from "../../components/Entry/styled";
import {Arrow} from "../../assets/icons/arrow";
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