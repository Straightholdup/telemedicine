import React, {useEffect} from 'react';
import {Greetings} from "../../widget/Greetings";
import {Help} from "../../widget/Help";
import {Benefits} from "../../widget/Benefits";
import {ForWho} from "../../widget/ForWho";
import {Categories} from "../../widget/Categories";
import {DoctorTypes} from "../../widget/DoctorTypes";
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