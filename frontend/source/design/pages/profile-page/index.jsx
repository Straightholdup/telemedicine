import React, {useEffect} from 'react';
import {Profile} from "../../components/Profile";
import {useSelector} from "react-redux";
import {ProfileDoctor} from "../../components/ProfileDoctor";

export const ProfilePage = () => {

    const typeUser = useSelector(state => state.categories.loginType);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Личный кабинет";
    }, []);

    return (
        <>
            {
                !typeUser ? <Profile/> : <ProfileDoctor/>
            }
        </>
    )
};