import React, {useEffect} from 'react';
import {Profile} from "../../design/components/Profile";
import {useSelector} from "react-redux";
import {ProfileDoctor} from "../../design/components/ProfileDoctor";

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