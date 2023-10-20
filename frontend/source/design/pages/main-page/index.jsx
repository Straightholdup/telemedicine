import React, {useEffect} from 'react';
import {Greetings} from "../../components/Greetings";
import {Help} from "../../components/Help";
import {Benefits} from "../../components/Benefits";
import {ForWho} from "../../components/ForWho";
import {Categories} from "../../components/Categories";
import {DoctorTypes} from "../../components/DoctorTypes";
import {useSelector} from "react-redux";

export const MainPage = () => {

    const typeUser = useSelector(state => state.categories.loginType);

    useEffect(() => {
        document.title = "Главная";
    }, []);

    return (
        <>
            {
                !typeUser
                    ?
                    <>
                        <Greetings/>
                        <Help/>
                        <Benefits/>
                        <ForWho/>
                        <Categories/>
                        <DoctorTypes/>
                    </>
                    :
                    <>
                        <Greetings/>
                        <Help/>
                        <Benefits/>
                        <ForWho/>
                    </>
            }

        </>
    )
};