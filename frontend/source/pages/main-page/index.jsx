import React, {useEffect} from 'react';
import {Greetings} from "../../design/components/Greetings";
import {Help} from "../../design/components/Help";
import {Benefits} from "../../design/components/Benefits";
import {ForWho} from "../../design/components/ForWho";
import {Categories} from "../../design/components/Categories";
import {DoctorTypes} from "../../design/components/DoctorTypes";
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